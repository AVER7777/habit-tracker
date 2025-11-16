import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Config
dotenv.config();
const app = express();

// Setting up middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Backend ok!');
})

// Starting the server
app.listen(process.env.DB_PORT, () => {
    console.log(`App listening at http://localhost:${process.env.DB_PORT}`)
})