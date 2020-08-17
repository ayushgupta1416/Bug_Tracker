const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;

const user = require('./routes/user');
const bugs = require('./routes/bugs');
const comment = require('./routes/comment');




mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database."))
  .catch(() => console.log("Failed to connect to database."));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/bugs', bugs);
app.use('/api/bugs', comment);



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`));