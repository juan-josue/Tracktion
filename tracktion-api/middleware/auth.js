const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	console.log('hello from middle');
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.status(401).send('Access denied. No token provided.');

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).send('Access denied. Invalid token provided.');
		req.user = user;
		next();
	});
}