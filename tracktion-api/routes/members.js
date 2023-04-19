const mongoose = require('mongoose');
const express = require('express');
const { Project } = require('../models/project');
const { Member, validateMember } = require('../models/member');
const { User } = require('../models/user');
const router = express.Router();

// POST a new project member
router.post('/', async (req, res) => {
	let project = await Project.findOne({ joinCode: req.body.joinCode });
	if (!project)
		return res.status(404).send('A project with the given joinCode was not found.');

	const existingMember = await Member.findOne({
		project: project._id,
		user: req.body.user,
	});
	if (existingMember)
		return res.status(400).send('The user is already a member for this project.');

	let newMember = new Member({
		user: req.body.user,
		project: project._id,
	});
	newMember = await newMember.save();

    // const { error } = validateMember(newMember);
	// if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findById(newMember.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	user.projects.push(project._id);
	await user.save();

	project.members.push(newMember._id);
	await project.save();

	res.send(newMember);
});

// DELETE a member
router.delete('/:id', async (req, res) => {
	const member = await Member.findByIdAndDelete(req.params.id);
	if (!member)
		return res.status(404).send('The member with the given ID was not found.');

	const project = await Project.findById(member.project);
	if (!project)
		return res.status(404).send('The project with the given ID was not found.');
	project.members.pull(member._id);
	await project.save();

	const user = await User.findById(member.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	user.projects.pull(project._id);
	await user.save();

	res.send(member);
});

module.exports = router;