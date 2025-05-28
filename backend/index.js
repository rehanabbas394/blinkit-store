import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/connectDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(cors({
    credentials: true,  // Allow credentials
    origin: process.env.FRONTEND_URL || 'http://localhost:3000' // Replace with your frontend URL
}));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for simplicity, configure as needed
})); // Security middleware
app.use(morgan()); // Logging middleware


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB
connectDB().then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
})