const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

// GET current user
router.get('/me', auth, async (req, res) => {
	// Find the user with the id provided by authentication middleware
	const user = await User.findById(req.user._id).select('-password');
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	// Send the user in the response
	res.send(user);
});

// GET specified user
router.get('/:id', async (req, res) => {
	// Find the user with the provided id
	const user = await User.findById(req.params.id).select('-password');
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	// Send the user in the response
	res.send(user);
});

// POST new user
router.post('/', async (req, res) => {
	// Validate the request body with the validateUser function
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Determine if a user already exists with the provided email
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('An account with that email already exists.');

	// Create a new user with the provided data
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		pfp: req.body.pfp,
	});

	// Hash the provided password with bcrypt
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	// Save the new user object to the database
	await user.save();

	// Send the user (without the password) in the response
	res.send({
		_id: user._id,
		name: user.name,
		email: user.email,
		pfp: user.pfp,
		projects: user.projects,
	});
});

// PUT specified user
router.put('/:id', async (req, res) => {
	// Validate the request body with the validateUser function
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Find the user with the given id and update their name with the provided data
	const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true }).select('-password');
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	// Send the updated user in the response
	res.send(user);
});

// DELETE specified user
router.delete('/:id', async (req, res) => {
	// Find and delete the user with the provided id
	const user = await User.findByIdAndDelete(req.params.id).select('-password');
	if (!user) return res.status(404).send('The user with the given ID was not found.');

	// Send the deleted user in the response
	res.send(user);
});

// Export the router object
module.exports = router;
