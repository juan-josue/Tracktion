import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import apiClient from "../services/apiClient";
import refreshAccessToken from "../services/refreshAccessToken";
import { Member, Project } from "../types/types";

const useProject = () => {
	const location = useLocation();
	const projectId = location.state?.projectId;
	const userId = location.state?.userId;

	const [member, setMember] = useState<Member>();
	const [project, setProject] = useState<Project>();
	const [errorMessage, setErrorMessage] = useState('');
	
    const navigate = useNavigate();

    useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		apiClient
			.get<Project>(`/projects/${projectId}`, {
				headers: { Authorization: `Bearer ${accessToken}` },
				params: { populateTasks: 'true', populateMembers: 'true' },
			})
			.then((res) => {
				setProject(res.data);
				res.data.members.forEach((member: Member) => {
					if (member.user._id === userId) {
						setMember(member);
					}
				});
			})
			.catch(async (err) => {
				if (err.response && err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						apiClient
							.get<Project>(`/projects/${projectId}`, {
								headers: { Authorization: `Bearer ${newAccessToken}` },
								params: { populateTasks: 'true', populateMembers: 'true' },
							})
							.then((res) => {
								setProject(res.data);
								res.data.members.forEach((member: Member) => {
									if (member.user === userId) {
										setMember(member);
									}
								});
							})
							.catch((err) => setErrorMessage(err.response.data));
					} else {
						navigate('/login');
					}
				} else {
					setErrorMessage(err.response.data);
				}
			});
	}, [navigate, projectId, userId]);

    return { member, project, errorMessage };
};

export default useProject;
