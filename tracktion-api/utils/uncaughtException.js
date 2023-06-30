const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.File({ filename: 'logfile.log' })],
});

function handleUncaughtException(ex) {
	logger.error(ex.message, { exception: ex });
	console.error(ex.message, ex);
	setTimeout(() => {
		process.exit(1);
	}, 2000);
}

module.exports = handleUncaughtException;
