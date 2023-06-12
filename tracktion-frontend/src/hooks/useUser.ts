import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../services/apiClient";
import refreshAccessToken from "../services/refreshAccessToken";
import { User } from "../types/types";

const useUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
		const accessToken = localStorage.getItem('access_token');

		apiClient
			.get('/users/me', { headers: { Authorization: `Bearer ${accessToken}` } })
			.then((res) => setUser(res.data.user))
			.catch(async (err) => {
				if (err.response.status === 401) {
					const newAccessToken = await refreshAccessToken();
					if (newAccessToken) {
						localStorage.setItem('access_token', newAccessToken);
						apiClient
							.get('/users/me', { headers: { Authorization: `Bearer ${newAccessToken}` } })
							.then((res) => setUser(res.data.user))
							.catch(() => navigate('/login'));
					} else {
						navigate('/login');
					}
				} else {
					navigate('/login');
				}
			});
	}, [navigate]);

    return { user };
};

export default useUser;
