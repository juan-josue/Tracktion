const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
	],
	ownedProjects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
		},
	],
});

const User = mongoose.model('User', userSchema);
exports.User = User;
