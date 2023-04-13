const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	level: {
		type: Number,
		default: 0,
	},
	xp: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
});

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
	code: {
		type: String,
		required: true,
		unique: true,
	},
	taskCounter: {
		type: Number,
		default: 0,
	},
	members: [memberSchema],
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
const Member = mongoose.model('Member', memberSchema);

exports.Project = Project;
exports.Member = Member;
exports.generateJoinCode = generateJoinCode;
