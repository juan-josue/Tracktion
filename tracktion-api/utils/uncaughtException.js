const { createLogger, transports, format } = require('winston');

// Create a logger instance using Winston
const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.File({ filename: 'logfile.log' })],
});

// Function to handle uncaught exceptions
function handleUncaughtException(ex) {
	// Log the exception message and exception object using the logger
	logger.error(ex.message, { exception: ex });

	// Output the exceotion to the console
	console.error(ex.message, ex);

	// Delay exit by 2s to allow logging to finish
	setTimeout(() => {
		process.exit(1);
	}, 2000);
}

// Export the handleUncaughtException function
module.exports = handleUncaughtException;
