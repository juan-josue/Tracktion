const mongoose = require('mongoose');
const express = require('express');
const { Task, validateTask } = require('../models/task');
const { Project } = require('../models/project');
const { Member } = require('../models/member');
const router = express.Router();
const auth = require('../middleware/auth');

// GET specified task
router.get('/:id', async (req, res) => {
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');
	res.send(task);
});

// POST new task
router.post('/', auth, async (req, res) => {
	const { error } = validateTask(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const project = await Project.findOne({ _id: req.body.project });
	if (!project) {
		return res.status(404).send('The project with the given ID was not found.');
	}

	let task = new Task({
		name: req.body.name,
		xpReward: req.body.xpReward,
		taskNumber: project.taskCounter,
		project: project._id,
		summary: req.body.summary,
		status: req.body.status,
		priority: req.body.priority,
		taskTackler: req.body.taskTackler
	});
	task = await task.save();

	project.taskCounter = project.taskCounter + 1;
	project.tasks.push(task._id);
	project.save();

	res.send(task);
});

// PUT specified task
router.put('/:id', async (req, res) => {
	const { error } = validateTask(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const task = await Task.findByIdAndUpdate(
		req.params.id,
		{
			...req.body,
			dateModified: Date.now(),
		},
		{ new: true }
	);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	res.send(task);
});

// DELETE specified task
router.delete('/:id', auth, async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	const project = await Project.findById(task.project);
	if (!task) return res.status(404).send('The project with the given ID was not found.');

	project.tasks.pull(task._id);
	await project.save();
	res.send(task);
});

// PUT task tackler
router.put('/:id/tackler', async (req, res) => {
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	const member = await Member.findById(req.body.memberId);
	if (!member) return res.status(404).send('The member with the given ID was not found.');

	task.taskTackler = member._id;
	await task.save();

	res.send(task);
});

module.exports = router;
