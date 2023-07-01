const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	// Get token from the authorization header
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).send('Access denied. No token provided.');

	// Verify the token using the secret environment key
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(401).send('Access denied. Invalid token provided.');

		// If there were no errors set the req user to the decoded user
		req.user = user;

		// Pass control to the next middleware function
		next();
	});
}