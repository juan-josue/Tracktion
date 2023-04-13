const mongoose = require('mongoose');
const express = require('express');
const { Project, generateJoinCode } = require('../models/project');
const { Member } = require('../models/member');
const router = express.Router();

// GET specified project
router.get('/:id', async (req, res) => {
	const project = await Project.findById(req.params.id);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');
	res.send(project);
});

// POST new project
router.post('/', async (req, res) => {
	const code = await generateJoinCode();

	let project = new Project({
		name: req.body.name,
		description: req.body.description,
		owner: req.body.owner,
		code: code,
	});

	project = await project.save();
	res.send(project);
});

// POST a new project member
router.post('/:id/members', async (req, res) => {
	let project = await Project.findById(req.params.id);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');

	const existingMember = await Member.findOne({
		project: req.params.id,
		user: req.body.userId,
	});
	if (existingMember)
		return res.status(400).send('The user is already a member for this project.');

	let newMember = new Member({
		user: req.body.userId,
		project: req.params.id,
	});
	newMember = await newMember.save();

	project.members.push(newMember._id);
	project = await project.save();
	res.send(project);
});

// PUT specified project
router.put('/:id', async (req, res) => {
	const project = await Project.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name, description: req.body.description },
		{ new: true }
	);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');

	res.send(project);
});

// DELETE specified project
router.delete('/:id', async (req, res) => {
	const project = await Project.findByIdAndDelete(req.params.id);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');

	res.send(project);
});

module.exports = router;
