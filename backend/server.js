import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { FRONTEND_URL, PORT } from './config.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

const app = express();

// Middleware
app.use(
    cors({
        origin: FRONTEND_URL,
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
app.listen(PORT);
