const mongoose = require('mongoose');
const express = require('express');
const { Project, generateJoinCode, validateProject } = require('../models/project');
const { Member } = require('../models/member');
const { User } = require('../models/user');
const { Task } = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();

// GET specified project
router.get('/:id', auth, async (req, res) => {
	const { populateTasks, populateMembers } = req.query;

	// Create a query to find the project with the provided id
	let query = Project.findById(req.params.id);

	// Populate the tasks attribute if the populateTasks query param is provided
	if (populateTasks) {
		query = query.populate({
			path: 'tasks',
			populate: {
				path: 'taskTackler',
				model: 'Member',
				populate: {
					path: 'user',
					model: 'User',
					select: '-password',
				},
			},
		});
	}

	// Populate the members attribute if the populateMembers query param is provided
	if (populateMembers) {
		query = query.populate({
			path: 'members',
			populate: {
				path: 'user',
				model: 'User',
				select: '-password',
			},
		});
	}

	// Execute the query to find the project with populated fields
	const project = await query.exec();
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	// Send the project object in the response
	res.send(project);
});

// GET projects in the provided list of project ids
router.get('/', async (req, res) => {
	// Get the project ids from the query parameters
	const projectIds = req.query.projectIds;

	// Find the projects with the provided ids
	const projects = await Project.find({ _id: { $in: projectIds } });

	// Send the projects back in the response
	res.send({ projects });
});

// POST new project
router.post('/', auth, async (req, res) => {
	// Validate the request body using the validateProject function
	const { error } = validateProject(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Generare a unique join code for the new project
	const joinCode = await generateJoinCode();

	// Create a new project object with the provided information
	let project = new Project({
		name: req.body.name,
		description: req.body.description,
		owner: req.user._id,
		joinCode: joinCode,
	});

	// Create a new member object for the project owner
	let newMember = new Member({
		user: req.user._id,
		project: project._id,
	});
	await newMember.save();

	// Add the new member to the project's member list
	project.members.push(newMember);

	// Save the project
	project = await project.save();

	// Add the new project's id to the user's project list
	await User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } });

	// Send the project object in the response
	res.send(project);
});

// PUT specified project
router.put('/:id', auth, async (req, res) => {
	// Validate the request body using the validateProject function
	const { error } = validateProject(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Find and update the project with the provided id
	const project = await Project.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name, description: req.body.description },
		{ new: true }
	);
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	// Send the updated project object in the response
	res.send(project);
});

// DELETE specified project
router.delete('/:id', auth, async (req, res) => {
	// Find the project with the provided id
	const project = await Project.findById(req.params.id);
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	// Delete all members in the project
	await Member.deleteMany({ project: project._id });

	// Delete all tasks in the project
	await Task.deleteMany({ project: project._id });

	// Remove the project from the project list of all associated users
	await User.updateMany({ projects: project._id }, { $pull: { projects: project._id } });

	// Delete the project itself
	await project.deleteOne();

	// Send the deleted project in the response
	res.send(project);
});

// DELETE a user from the project
router.delete('/:projectId/user/:userId', auth, async (req, res) => {
	// Find the project with the provided id and populate it's members and tasks
	const project = await Project.findById(req.params.projectId)
		.populate({
			path: 'members',
			populate: {
				path: 'user',
				model: 'User',
				select: '-password',
			},
		})
		.populate('tasks');
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	// Fidn the user with the provided id
	const user = await User.findById(req.params.userId);
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	// Find the member with the corresponding user id in the project
	const member = project.members.find((member) => member.user._id.equals(user._id));
	if (!member) return res.status(400).send('This user is not a member of the project.');

	// Remove the member from the project
	project.members.pull(member);

	// Remove the member from each project task they were assigned to
	project.tasks.forEach(async (task) => {
		if (task.taskTackler && task.taskTackler.equals(member._id)) {
			task.taskTackler = null;
			await task.save();
		}
	});

	// Save the updated project
	await project.save();

	// Delete the member object
	await Member.findByIdAndDelete(member._id);

	// Remove the project from the user's project list
	user.projects.pull(project._id);
	await user.save();

	// Send the updated project as the response
	res.send(project);
});

// Export the router object
module.exports = router;
