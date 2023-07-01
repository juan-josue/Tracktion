const { createLogger, transports, format } = require('winston');

// Create a logger instance using Winston
const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.File({ filename: 'logfile.log' })],
});

// Export an error handling middleware function for logging internal server errors
module.exports = function (err, req, res, next) {
	logger.error(err.message, { error: err });

	res.status(500).send('Internal server error. Please try again later.');
};
