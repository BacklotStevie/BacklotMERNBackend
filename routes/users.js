//tell the server to use the models files we just created
//need express router because were creating a route. We also need to require the model
const router = require('express').Router();
let User = require('../models/user.models');
//assigns created user password a unique token as a securty feature
let jwt = require('jsonwebtoken')

//now we create our first route
router.route('/').get((req, res) => {
    //get a list from all users in database. find method returns a promise in json format. then format returns users retrieved from database
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

//second endpoint handles incoming http post requests.
//this endpoint handles users creating an account.
router.route('/signup').post((req, res) => {
    //make sure there is no other email in the database that matches the one being created
    User.findOne({ email: req.body.email })
        .then((user) => {
            //if email is already found, user gets an error
            if (user) return res.status(400).send("Email already exists");
            else {
                //user is given a text field where they need to input all requirements to create a user
                return User.create({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password,
                    //once user is succesfully created they're assinged a special token
                }).then((user) => {
                    let token = jwt.sign({ id: user._id }, 'shhhh')
                    //once token is given, I would see the user email, token and usertype on my terminal and database
                    res.status(200).json({
                        token,
                        user: {
                            email: user.email,
                            userType: user.userType
                        }
                    })
                })
            }
        })
        //This occurs when the user has an error on their end.
        .catch((err) => {
            res.status(500).send('Whoops!')
        })
})

//login CRUD function
router.route("/login").post((req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                alert("Invalid credentials!");
                res.status(403).send("Invalid credentials");
            }
            else if (user.password === req.body.password) {
                var token = jwt.sign({ id: user._id }, 'shhh')
                res.status(200).json({
                    token,
                    user: {
                        email: user.email,
                        userType: user.userType
                    }
                })
                console.log(token)
            }
            else {
                res.status(403).send("Invalid credentials")
            }
        })
})

module.exports = router;