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
	const { populateTasks } = req.query;

	let query = Project.findById(req.params.id);

	if (populateTasks) {
		query = query.populate('tasks');
	}

	const project = await query.exec();

	if (!project) return res.status(404).send('The project with the given ID was not found.');
	res.send(project);
});

// GET projects by in the provided list of project ids
router.get('/', async (req, res) => {
	const projectIds = req.query.projectIds;
	const projects = await Project.find({
		_id: { $in: projectIds },
	});
	res.send({ projects });
});

// POST new project
router.post('/', auth, async (req, res) => {
	const { error } = validateProject(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const joinCode = await generateJoinCode();

	let project = new Project({
		name: req.body.name,
		description: req.body.description,
		owner: req.user._id,
		joinCode: joinCode,
	});

	let newMember = new Member({
		user: req.user._id,
		project: project._id,
	});
	await newMember.save();

	project.members.push(newMember);
	project = await project.save();

	await User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } });

	res.send(project);
});

// PUT specified project
router.put('/:id', async (req, res) => {
	const { error } = validateProject(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const project = await Project.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name, description: req.body.description },
		{ new: true }
	);
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	res.send(project);
});

// DELETE specified project
router.delete('/:id', async (req, res) => {
	const project = await Project.findById(req.params.id);
	if (!project) return res.status(404).send('The project with the given ID was not found.');

	await Member.deleteMany({ project: project._id });

	await Task.deleteMany({ project: project._id });

	await User.updateMany({ projects: project._id }, { $pull: { projects: project._id } });

	await project.deleteOne();

	res.send(project);
});

module.exports = router;
