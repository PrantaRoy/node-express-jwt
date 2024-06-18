const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth' , require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
     console.log('server running');
});