const logout = () => {
	try {
		// Remove access token and refresh token from local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	} catch (error) {
        console.error('Error occurred while logging out:', error);
	}
};

export default logout;
