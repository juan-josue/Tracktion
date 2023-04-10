const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

// GET current user
router.get('/me', async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});

// GET specified user
router.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (!user) return res.status(404).send('The user with the given ID was not found.');
	res.send(user);
});

// POST new user
router.post('/', async (req, res) => {
	let user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	user = await user.save();
	res.send(user);
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
