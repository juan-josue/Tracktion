const mongoose = require('mongoose');
const Joi = require('joi');

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
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(10).required(),
		name: Joi.string().min(1).max(50).required(),
	});

	return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
