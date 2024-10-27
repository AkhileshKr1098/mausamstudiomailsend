import express from 'express';
import bodyParser from 'body-parser';
import sendEmailHandler from './api/sendEmail.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/sendEmail', sendEmailHandler);

app.get('/', (req, res) => {
    res.json('port starting onn')
})

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);
});


