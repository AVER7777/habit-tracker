import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

// Config
dotenv.config();

const app = express();

// Setting up middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, _next) => {
    console.error(err);

    const status = err.statusCode || 500;

    const message = err.message || 'Internal Server Error';

    return res.status(status).json({ message });
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Backend ok!');
});

// Starting the server
app.listen(process.env.PORT);