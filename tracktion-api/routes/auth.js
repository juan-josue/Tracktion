const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../models/user');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

//GET login test
router.get('/', authenticateToken, (req, res) => {
	res.send(req.user);
});

// POST login request
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const authToken = user.generateAuthToken();
	res.send({ authToken: authToken });
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email(),
		password: Joi.string().min(10),
	});

	return schema.validate(req);
}

module.exports = router;
