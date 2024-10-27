import express from 'express';
import bodyParser from 'body-parser';
import sendEmailHandler from './api/sendEmail.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for sending email
app.post('/api/sendEmail', sendEmailHandler);

// Root route
app.get('/', (req, res) => {
    res.json('Server is running');
});

// Export the Express app to be used by Vercel
export default app;
