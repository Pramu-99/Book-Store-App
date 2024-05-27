import express from "express";
import mongoose from 'mongoose';
import { PORT, mongoURL } from './config.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

//middleware setup
//cors policy
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome Book Store!');
})

app.use('/books', bookRoute);

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('Database Connected Successfully!');
        app.listen(PORT, () => {
            console.log(`Server Running on Port:${PORT}`);
        })
    })
    .catch((error) => {
        console.error(error);
    })
