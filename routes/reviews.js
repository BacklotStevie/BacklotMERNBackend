const router = require('express').Router();
let Review = require('../models/review.models');
let Info = require('../models/review.models');
let jwt = require('jsonwebtoken')

require('dotenv').config();

//now we create our first route
router.route('/').get((req, res) => {
    //get a list from all reviews in database. find method returns a promise in json format. then format returns reviews retrieved from database
    Review.find()
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add a review function
router.route('/writeReview').post((req, res) => {

    //the following code only lets people with a specific token write a review. req.headers.auth checks bearer token assigned to specific user. .split converts spaces into comas, and gets the word "bearer" out of the token. the [1] takes us to the token in the array, since that is the position after "bearer"
    // let token = req.headers.authorization.split(" ")[1];
    // let decoded = jwt.verify(token, 'shhhh');

    //.combined lets us add additional headers and body text that are nested in our schema. .then(insertedReview) then pushed the new review into the API
    //     Review.create(req.body.combined)
    //         .then((insertedReview) => {
    //             res.send('Review inserted')
    //         })
    //         .catch((err) => {
    //             res.status(500).send("Whoops!")
    //         })
    // });

    //all the variables inside the schema are being required when we create a review
    const title = req.body.title;
    const writer = req.body.writer;
    const genre = req.body.genre;
    const heading = req.body.heading;
    const info = req.body.info;
    const img = req.body.img;

    //creates a review by using the schema and utilizing the variables created above
    const newReview = new Review({ title, writer, genre, heading, info, img })

    //saves the review
    newReview.save()
        .then(() => res.json('Review added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;