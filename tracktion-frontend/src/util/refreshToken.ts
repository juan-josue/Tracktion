import axios from 'axios';

const refreshAccessToken = async (refreshToken: string) => {
	console.log('attempting to refresh token...');
	try {
		const response = await axios.post('http://localhost:3000/api/auth/token', { token: refreshToken });
		const { accessToken } = response.data;
		localStorage.setItem('access_token', accessToken);
		return accessToken;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default refreshAccessToken;
