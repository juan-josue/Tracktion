const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	level: {
		type: Number,
		default: 0,
	},
	xp: {
		type: Number,
		default: 0,
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
	},
	members: [memberSchema],
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
	totalTasks: {
		type: Number,
		required: true,
	},
});

const Project = mongoose.model('Project', projectSchema);
exports.Project = Project;
