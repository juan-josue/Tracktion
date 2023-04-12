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

// PUT specified user
router.put('/:id', async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	res.send(user);
});

// DELETE specified user
router.delete('/:id', async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	res.send(user);
});

module.exports = router;
