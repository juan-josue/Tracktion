const mongoose = require('mongoose');
const Joi = require('joi');

const xpCap = 20;

const memberSchema = new mongoose.Schema({
	level: {
		type: Number,
		default: 0,
		min: 0,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	xp: {
		type: Number,
		default: 0,
		min: 0,
	},
	xpCap: {
		type: Number,
		default: xpCap,
	},
});

const Member = mongoose.model('Member', memberSchema);

function validateMember(member) {
	const schema = Joi.object({
		user: Joi.string(),
		project: Joi.string(),
		level: Joi.number().integer().min(0),
		xp: Joi.number().integer().min(0).max(xpCap),
		xpCap: Joi.number().integer().min(0),
	});

	return schema.validate(member);
}

exports.Member = Member;
exports.validateMember = validateMember;
