const mongoose = require('mongoose');
const express = require('express');
const { Task, validateTask } = require('../models/task');
const { Project } = require('../models/project');
const { Member } = require('../models/member');
const router = express.Router();
const auth = require('../middleware/auth');

// GET specified task
router.get('/:id', async (req, res) => {
	// Find the task with the provided id
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	// Send the task in the response
	res.send(task);
});

// POST new task
router.post('/', auth, async (req, res) => {
	// Validate the request body with the validateTask function
	const { error } = validateTask(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Find the project with the provided project id
	const project = await Project.findOne({ _id: req.body.project });
	if (!project) {
		return res.status(404).send('The project with the given ID was not found.');
	}

	// Create a new task withthe provided data
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

	// Save the task to the database
	task = await task.save();

	// Update the project's task counter and add the task to the project's task list
	project.taskCounter = project.taskCounter + 1;
	project.tasks.push(task._id);

	// Save the updated project
	project.save();

	// Send the new task in the response
	res.send(task);
});

// PUT specified task
router.put('/:id', async (req, res) => {
	// Validate the request body with the validateTask function
	const { error } = validateTask(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Find the task with the provided id and update it with the data provided from the body
	const task = await Task.findByIdAndUpdate(
		req.params.id,
		{
			...req.body,
			dateModified: Date.now(),
		},
		{ new: true }
	);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	// Send the task in the response
	res.send(task);
});

// DELETE specified task
router.delete('/:id', auth, async (req, res) => {
	// Find the task with the provided id
	const task = await Task.findByIdAndDelete(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	// Find the project with the provided id
	const project = await Project.findById(task.project);
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	// Remove the task from the project
	project.tasks.pull(task._id);
	await project.save();

	// Send the deleted task in the response
	res.send(task);
});

// PUT task tackler
router.put('/:id/tackler', async (req, res) => {
	// Find the task with the given id
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).send('The task with the given ID was not found.');

	// Find the  member with the given id
	const member = await Member.findById(req.body.memberId);
	if (!member) return res.status(404).send('The member with the given ID was not found.');

	// Assign the new taskTackler and save the updated task
	task.taskTackler = member._id;
	await task.save();

	// Send the updated task in the response
	res.send(task);
});

// Export the router object
module.exports = router;
