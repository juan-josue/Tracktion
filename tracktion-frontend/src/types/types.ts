export interface Project {
	_id: string;
	description: string;
	joinCode: string;
	members: string[];
	name: string;
	owner: string;
	taskCounter: number;
	tasks: string[];
}

export interface User {
	_id: string;
	name: string;
	email: string;
	projects: string[];
}
