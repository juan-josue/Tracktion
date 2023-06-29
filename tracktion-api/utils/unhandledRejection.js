const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.File({ filename: 'logfile.log' })],
});

function handleUnhandledRejection(ex) {
    logger.error(ex.message, { exception: ex });
    process.exit(1);
}

module.exports = handleUnhandledRejection;
