require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./api/routes/user');

const app = express();

// Connect to DB
connectDB();

app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
