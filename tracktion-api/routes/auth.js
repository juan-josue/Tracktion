const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

// Change to using database later
let refreshTokens = [];

// POST login request
router.post('/login', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const accessToken = generateAccessToken({ _id: user._id, name: user.name });
	const refreshToken = jwt.sign({ _id: user._id, name: user.name }, process.env.REFRESH_TOKEN_SECRET);
	refreshTokens.push(refreshToken);

	res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

// POST refresh access token
router.post('/token', async (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ _id: user._id, name: user.name });
		res.send({ accessToken: accessToken });
	});
});

router.delete('/logout', (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
});

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email(),
		password: Joi.string().min(10),
	});

	return schema.validate(req);
}

module.exports = router;
