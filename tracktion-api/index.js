require('dotenv').config();
const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
const members = require('./routes/members');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/members', members);

// Define the port to listen on
const port = process.env.PORT || 3000;

// Define database uri (uniform resource identifier)
const db = process.env.DB_URI;

mongoose
	.connect(db)
	.then(() => console.log('Connected to MongoDB Atlas...'))
	.catch((err) => console.error('Could not connect to MongoDB Atlas...', err));

// Start listening on the specified port
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
