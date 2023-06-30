const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.Console(), new transports.File({ filename: 'logfile.log' })],
});

function handleUnhandledRejection(ex) {
	logger.error(ex.message, { exception: ex });
	console.error(ex.message, ex);
	setTimeout(() => {
		process.exit(1);
	}, 2000);
}

module.exports = handleUnhandledRejection;
