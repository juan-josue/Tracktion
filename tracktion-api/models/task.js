const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    summary: String,
    status: String,
    priority: String,
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
		required: true,
	},
	dateModified: {
		type: Date,
		required: true,
	},
	taskTackler: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

const Task = mongoose.model('Task', taskSchema);
exports.Task = Task;
