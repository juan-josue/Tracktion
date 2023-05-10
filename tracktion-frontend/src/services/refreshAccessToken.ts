import apiClient from './apiClient'

const refreshAccessToken = async () => {
	try {
		const refreshToken = localStorage.getItem('refresh_token');
		const response = await apiClient.post('/auth/token', { token: refreshToken });
		const { accessToken } = response.data;
		localStorage.setItem('access_token', accessToken);
		return accessToken;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default refreshAccessToken;
