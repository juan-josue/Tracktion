import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import apiClient from '../../services/apiClient';
import ProjectCard from './ProjectCard';
import { Project } from '../../types/types';

interface FetchUserResponse {
	projects: Project[];
}

interface Props {
	projectIds: string[];
	onProjectCardClick: (project: Project) => void;
}

const ProjectList = ({ projectIds, onProjectCardClick }: Props) => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [errorMessage, setErrorMessage] = useState('');

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
			})
			.catch((err) => setErrorMessage(err.message));
	}, [projectIds]);

	return (
		<>
			{errorMessage && (
				<Typography variant="body1" color="error">
					{errorMessage}
				</Typography>
			)}
			<Stack direction="column" spacing={2}>
				<Typography variant="h5" color="typography.main" fontWeight="bold">
					Your Adventure List
				</Typography>
				<Stack direction="row" spacing={5} sx={{ overflowY: 'hidden' }}>
					{projects.map((project) => (
						<ProjectCard key={project._id} color="primary.main" project={project} onClick={handleProjectCardClick} />
					))}
				</Stack>
			</Stack>
		</>
	);
};

export default ProjectList;
