const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.File({ filename: 'logfile.log' })],
});

module.exports = function (err, req, res, next) {
	logger.error(err.message, { error: err });

	res.status(500).send('Internal server error. Please try again later.');
};
