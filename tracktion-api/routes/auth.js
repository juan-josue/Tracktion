const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

// POST login request
router.post('/login', async (req, res) => {
	// Use validation function to validate the req body
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Determine if the provided email exists in the database
	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	// Compare the provided password with the actual password using the password hash
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	// Generate an access token and refresh token for the authenticated user
	const accessToken = generateAccessToken({ _id: user._id, name: user.name });
	const refreshToken = jwt.sign({ _id: user._id, name: user.name }, process.env.REFRESH_TOKEN_SECRET);

	// Send the access token and refresh token in the response
	res.send({ accessToken: accessToken, refreshToken: refreshToken });
});

// POST refresh access token
router.post('/token', async (req, res) => {
	// Get refresh token from the body, send a 401 error if none is provided
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);

	// Verify the refresh token with the secret refresh token key
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		// If verfication fails send a 403 forbidden status code
		if (err) return res.sendStatus(403);

		// Generate a new access token
		const accessToken = generateAccessToken({ _id: user._id, name: user.name });

		// Send the new access token in the resposne
		res.send({ accessToken: accessToken });
	});
});
// Generate a new access token using the user data and access token secret that expires in 20 mins
function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
}

// Login request body verification using Joi
function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email(),
		password: Joi.string().min(10),
	});

	// Validate the request body against the defined schema
	return schema.validate(req);
}

// Export the router object
module.exports = router;
