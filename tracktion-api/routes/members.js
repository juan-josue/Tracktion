const mongoose = require('mongoose');
const express = require('express');
const { Project } = require('../models/project');
const { Member, validateMember } = require('../models/member');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

// POST a new project member
router.post('/', async (req, res) => {
	let project = await Project.findOne({ joinCode: req.body.joinCode });
	if (!project) return res.status(404).send('A project with the given joinCode was not found.');

	const { error } = validateMember({ user: req.body.user, project: project._id.toString() });
	if (error) return res.status(400).send(error.details[0].message);

	const existingMember = await Member.findOne({ project: project._id, user: req.body.user });
	if (existingMember) return res.status(400).send('The user is already a member for this project.');

	let newMember = new Member({ user: req.body.user, project: project._id });
	newMember = await newMember.save();

	const user = await User.findById(newMember.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	user.projects.push(project._id);
	await user.save();

	await Project.findByIdAndUpdate(project._id, { $push: { members: newMember._id } });

	res.send(newMember);
});

// DELETE a member
router.delete('/:id', async (req, res) => {
	const member = await Member.findByIdAndDelete(req.params.id);
	if (!member) return res.status(404).send('The member with the given ID was not found.');

	const project = await Project.findById(member.project);
	if (!project) return res.status(404).send('The project with the given ID was not found.');
	project.members.pull(member._id);
	await project.save();

	const user = await User.findById(member.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	user.projects.pull(project._id);
	await user.save();

	res.send(member);
});

// PUT user level
router.post('/:id/addxp', auth, async (req, res) => { 
	const id = req.params.id;
	let { xpReward } = req.body;

	if (!xpReward || xpReward < 0) return res.status(400).send('Invalid XP reward.');
	
	const member = await Member.findById(id);
	if (!member) return res.status(404).send('The member with the given ID was not found.');

	let levelsGained = 0;

	// While there is still xp to be rewarded
	while (xpReward > 0) {
		// Level up
		if (member.xp + xpReward >= member.xpCap) {
			xpReward = xpReward - (member.xpCap - member.xp)
			levelsGained++;
			member.xp = 0;
			member.xpCap += 5;
		// No level up
		} else {
			member.xp = member.xp + xpReward;
			xpReward = 0;
		}
	}
	member.level += levelsGained;
	
	await member.save();	

	res.send(member);
});

module.exports = router;
