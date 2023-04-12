const mongoose = require('mongoose');
const express = require('express');
const { Task } = require('../models/task');
const { Project } = require('../models/project');
const router = express.Router();

// GET specified task
router.get('/:id', async (req, res) => {
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');
	res.send(task);
});

// POST new task
router.post('/', async (req, res) => {
	const project = await Project.findOne({ _id: req.body.projectId });
	if (!project) {
		return res.status(404).send('The project with the given ID was not found.');
	}

	let task = new Task({
		name: req.body.name,
		xpReward: req.body.xpReward,
		taskNumber: project.taskCounter,
		project: project._id,
	});
	task = await task.save();

	project.taskCounter = project.taskCounter + 1;
	project.tasks.push(task._id);
	project.save();

	res.send(task);
});

// PUT specified task
router.put('/:id', async (req, res) => {
	const task = await Task.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body?.name,
			xpReward: req.body?.xpReward,
			summary: req.body?.summary,
			priority: req.body?.priority,
			status: req.body?.status,
			taskTackler: req.body?.taskTackler,
			dateModified: Date.now(),
		},
		{ new: true }
	);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	res.send(task);
});

// DELETE specified tasks
router.delete('/:id', async (req, res) => {
	const tasks = await Task.findByIdAndDelete(req.params.id);
	if (!tasks) return res.status(404).send('The tasks with the given ID was not found.');

	res.send(tasks);
});

module.exports = router;
