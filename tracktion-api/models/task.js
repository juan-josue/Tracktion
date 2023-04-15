const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	dateCreated: {
		type: Date,
		default: Date.now,
		immutable: true,
	},
	dateModified: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
		maxLength: 100,
		minLength: 1,
	},
	priority: {
		type: String,
		enum: ['High', 'Medium', 'Low', 'None'],
		default: 'None',
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	status: {
		type: String,
		enum: ['To-do', 'Doing', 'Done'],
		default: 'To-do',
	},
	summary: {
		type: String,
		maxLength: 1024,
	},
	taskNumber: {
		type: Number,
		required: true,
		min: 0,
	},
	taskTackler: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member',
		default: null,
	},
	xpReward: {
		type: Number,
		required: true,
		min: 0,
	},
});

const Task = mongoose.model('Task', taskSchema);
exports.Task = Task;
