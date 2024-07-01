const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');
const mapDataRoutes = require('./routes/mapData');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mapdata', authMiddleware, mapDataRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
