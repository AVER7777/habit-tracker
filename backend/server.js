import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Config
dotenv.config();
const app = express();
const port = 3000;

// Setting up middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Backend ok!');
})

// Starting the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})