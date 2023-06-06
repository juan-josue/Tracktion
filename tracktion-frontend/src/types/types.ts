export interface Project {
	_id: string;
	description: string;
	joinCode: string;
	members: Member[];
	name: string;
	owner: string;
	taskCounter: number;
	tasks: Task[];
}

export interface User {
	_id: string;
	name: string;
	email: string;
	projects: string[];
	pfp: string;
}

export interface Member {
	_id: string;
	level: string;
	project: string;
	user: User;
	xp: number;
	xpCap: number;
}

export interface Task {
	_id: string,
	dateCreated: Date,
	dateModified: Date,
	name: string,
	priority: string,
	project: string,
	status: string,
	summary: string,
	taskNumber: number,
	taskTackler: Member,
	xpReward: number,
}
