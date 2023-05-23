export interface Project {
	_id: string;
	description: string;
	joinCode: string;
	members: string[];
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
	taskTackler: string,
	xpReward: number,
}
