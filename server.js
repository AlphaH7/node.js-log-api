import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './api/userRoutes.js';

dotenv.config();

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
