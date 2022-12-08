const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
dotenv.config()

// Config JSON response
app.use(express.json());

app.use(cors());

// Public folder
app.use(express.static('public'));

// Routes
const UserRoutes = require('./app/routes/UserRoutes');
const MovieRoutes = require('./app/routes/MovieRoutes');

app.use('/users', UserRoutes);
app.use('/movies', MovieRoutes);

app.listen(process.env.PORT || 5000);
