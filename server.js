//require everything we're going to need
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//configures environment variables from dotenv
require('dotenv').config();

//create express server
const app = express();
const port = process.env.PORT || 5000;

//middlware and allow us to parse json
app.use(cors());
app.use(express.json());

//uri comes from mongoDB dashboard, and gets passed through mongoose.connect. 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//require routes for the server 
const usersRouter = require('./routes/users.js');
const reviewsRouter = require('./routes/reviews.js')

//heroku post
app.get("/" , (req, res) => {
    res.send("Hello to Backlot API")
})

//endpoints that have to be hit to see the database information (localhost5000/users show all users, etc)
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter)

//what starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
