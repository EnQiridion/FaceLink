const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userroutes');
const postRoutes = require('./routes/postroutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/facelink')

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));