const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	joinCode: {
		type: String,
		required: true,
		unique: true,
	},
	taskCounter: {
		type: Number,
		default: 0,
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Member',
		},
	],
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
