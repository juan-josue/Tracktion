const mongoose = require('mongoose');
const express = requrie('express');
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
    if (!user) return res.status(404).send('The user with the given ID was not found.')
	res.send(user);
});

// POST new user

module.exports = router;
