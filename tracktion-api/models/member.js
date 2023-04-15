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
	xpCap: {
		type: Number,
		default: 20,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
		required: true,
	},
});

const Member = mongoose.model('Member', memberSchema);

exports.Member = Member;