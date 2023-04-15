const mongoose = require('mongoose');

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
exports.User = User;
