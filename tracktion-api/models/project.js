const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
		maxLength: 1024,
	},
	joinCode: {
		type: String,
		required: true,
		unique: true,
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Member',
		},
	],
	name: {
		type: String,
		required: true,
		maxLength: 50,
		minLength: 1,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	taskCounter: {
		type: Number,
		default: 0,
		min: 0,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

async function generateJoinCode() {
	let code;
	do {
		code =
			Math.random().toString(36).substring(2, 6).toUpperCase() +
			'-' +
			Math.random().toString(36).substring(2, 6).toUpperCase();
	} while (await Project.findOne({ code: code }));
	return code;
}

const Project = mongoose.model('Project', projectSchema);

exports.Project = Project;
exports.generateJoinCode = generateJoinCode;
