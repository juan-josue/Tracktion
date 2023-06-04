const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	password: {
		type: String,
		required: true,
		minLength: 10,
	},
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
	],
	name: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 50,
	},
	pfp: {
		type: String,
		required: true,
	}
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		email: Joi.string().email(),
		password: Joi.string().min(10),
		name: Joi.string().min(1).max(50),
		pfp: Joi.string(),
	});

	return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
