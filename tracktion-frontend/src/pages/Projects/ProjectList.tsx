import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import apiClient from '../../services/apiClient';
import ProjectCard from './ProjectCard';

interface Project {
	_id: string;
	description: string;
	joinCode: string;
	name: string;
	owner: string;
}

interface FetchUserResponse {
	projects: Project[];
}

interface Props {
	projectIds: string[];
	onProjectCardClick: (project: Project) => void;
	updateProjects: (projects: Project[]) => void;
}

const ProjectList = ({ projectIds, onProjectCardClick, updateProjects }: Props) => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [error, setError] = useState('');

	const handleProjectCardClick = (project: Project) => {
		onProjectCardClick(project);
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		apiClient
			.get<FetchUserResponse>('/projects', {
				params: {
					projectIds: projectIds,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => {
				setProjects(res.data.projects);
				updateProjects(res.data.projects);
			})
			.catch((err) => setError(err.message));
	}, [projectIds, updateProjects]);

	return (
		<Stack direction="row" spacing={5} mt={2} sx={{ overflowY: 'hidden' }}>
			{projects.map((project) => (
				<ProjectCard key={project._id} project={project} onClick={handleProjectCardClick}/>
			))}
		</Stack>
	);
};

export default ProjectList;
