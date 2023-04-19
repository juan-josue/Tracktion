const mongoose = require('mongoose');
const Joi = require('joi');

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

function validateTask(task) {
	const schema = Joi.object({
		dateCreated: Joi.date(),
		dateModified: Joi.date(),
		name: Joi.string().required().max(100).min(1),
		priority: Joi.string().valid('High', 'Medium', 'Low', 'None').default('None'),
		project: Joi.string().required(),
		status: Joi.string().valid('To-do', 'Doing', 'Done').default('To-do'),
		summary: Joi.string().max(1024),
		taskNumber: Joi.number().min(0),
		taskTackler: Joi.string(),
		xpReward: Joi.number().required().min(0),
	});

	return schema.validate(task);
}

exports.Task = Task;
exports.validateTask = validateTask;
