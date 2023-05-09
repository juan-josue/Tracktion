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
}

const ProjectList = ({ projectIds }: Props) => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [error, setError] = useState('');

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
			.then((res) => setProjects(res.data.projects))
			.catch((err) => setError(err.message));
	}, [projectIds]);

	return (
		<Stack direction="row" spacing={5} mt={2} sx={{ overflowY: 'hidden' }}>
			{projects.map((project) => (
				<ProjectCard key={project._id} project={project} />
			))}
		</Stack>
	);
};

export default ProjectList;
