const mongoose = require('mongoose');
const express = require('express');
const { Project } = require('../models/project');
const { Member, validateMember } = require('../models/member');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

// POST a new memeber to a project
router.post('/', async (req, res) => {
	// Find the project with the provided joinCode
	let project = await Project.findOne({ joinCode: req.body.joinCode });
	if (!project) return res.status(404).send('A project with the given joinCode was not found.');

	// Validate the request body with the validateMember function
	const { error } = validateMember({ user: req.body.user, project: project._id.toString() });
	if (error) return res.status(400).send(error.details[0].message);

	// Determine if the user is an existing member
	const existingMember = await Member.findOne({ project: project._id, user: req.body.user });
	if (existingMember) return res.status(400).send('The user is already a member for this project.');

	// Create a new member object and save it to the database
	let newMember = new Member({ user: req.body.user, project: project._id });
	newMember = await newMember.save();

	// Find the user associated to the new member
	const user = await User.findById(newMember.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	// Add the project to the user's project list
	user.projects.push(project._id);
	await user.save();

	// Add the new member to the project's member list
	await Project.findByIdAndUpdate(project._id, { $push: { members: newMember._id } });

	// Send the new member object in the response
	res.send(newMember);
});

// DELETE a member
router.delete('/:id', async (req, res) => {
	// Find and delete the member with the provided id
	const member = await Member.findByIdAndDelete(req.params.id);
	if (!member) return res.status(404).send('The member with the given ID was not found.');

	// Find the project associated with the deleted member
	const project = await Project.findById(member.project);
	if (!project) return res.status(404).send('The project with the given ID was not found.');
	
	// Remove the deleted member from the project
	project.members.pull(member._id);
	await project.save();

	// Find the user associated with deleted member
	const user = await User.findById(member.user);
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	
	// Remove the project the member was a part of from the user's project list
	user.projects.pull(project._id);
	await user.save();

	// Send the deleted member object in the response
	res.send(member);
});

// PUT user level
router.post('/:id/addxp', auth, async (req, res) => { 
	const id = req.params.id;
	let { xpReward } = req.body;

	// Validate xpReward
	if (!xpReward || xpReward < 0) return res.status(400).send('Invalid XP reward.');
	
	// Find the member with the provided id
	const member = await Member.findById(id);
	if (!member) return res.status(404).send('The member with the given ID was not found.');

	let levelsGained = 0;

	// While there is still xp to be rewarded
	while (xpReward > 0) {
		// Level up if remaining xp exceeds xp cap
		if (member.xp + xpReward >= member.xpCap) {
			xpReward = xpReward - (member.xpCap - member.xp)
			levelsGained++;
			member.xp = 0;
			member.xpCap += 5;
		// No level up, add remaining xp
		} else {
			member.xp = member.xp + xpReward;
			xpReward = 0;
		}
	}
	member.level += levelsGained;
	
	// save the updated member
	await member.save();	

	// Send the updated member in the response
	res.send(member);
});

// Export the router object
module.exports = router;
