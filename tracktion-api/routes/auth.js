const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

// POST login request
router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const authToken = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN_SECRET);
	res.send({ authToken: authToken });
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email(),
		password: Joi.string().min(10),
	});

	return schema.validate(req);
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).send('Access denied. No token provided.');

	jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).send('Access denied. Invalid token provided.');
		req.user = user;
		next();
	});
}

module.exports = router;
