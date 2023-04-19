const mongoose = require('mongoose');
const Joi = require('joi');

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

const Project = mongoose.model('Project', projectSchema);

async function generateJoinCode() {
	let newCode;
	do {
		newCode =
			Math.random().toString(36).substring(2, 6).toUpperCase() +
			'-' +
			Math.random().toString(36).substring(2, 6).toUpperCase();
	} while (await Project.findOne({ joinCode: newCode }));
	return newCode;
}

function validateProject(project) {
	const schema = Joi.object({
		description: Joi.string().max(1024).required(),
		name: Joi.string().min(1).max(50).required(),
		owner: Joi.string().required(),
		taskCounter: Joi.number().min(0),
		tasks: Joi.array().items(Joi.string()),
	});

	return schema.validate(project);
}

exports.Project = Project;
exports.generateJoinCode = generateJoinCode;
exports.validateProject = validateProject;
