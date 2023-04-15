const mongoose = require('mongoose');

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
		max: xpCap,
	},
	xpCap: {
		type: Number,
		default: xpCap,
	},
});

const Member = mongoose.model('Member', memberSchema);

exports.Member = Member;
