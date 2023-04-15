const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    summary: String,
    status: {
		type: String,
		default: "TO-DO",
	},
    priority: {
		type: String,
		default: "None",
	},
	taskNumber: {
		type: Number,
		required: true,
	},
	xpReward: {
		type: Number,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	dateModified: {
		type: Date,
		default: Date.now,
	},
	taskTackler: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Member',
		default: null,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
});

const Task = mongoose.model('Task', taskSchema);
exports.Task = Task;
