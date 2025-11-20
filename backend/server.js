import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

// Config
dotenv.config();

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// Error handling middleware
app.use((err, req, res) => {
    console.error(err);

    const status = err.statusCode || 500;

    const message = err.message || 'Internal Server Error';

    return res.status(status).json({ message });
});

// Test route
app.get('/', (req, res) => {
    res.send('Backend ok!');
});

// Starting the server
app.listen(process.env.PORT);
