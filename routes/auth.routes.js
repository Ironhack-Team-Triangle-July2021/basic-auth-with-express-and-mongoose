const router = require("express").Router();

const mongoose = require('mongoose');
const User = require('../models/User.model');

const bcrypt = require('bcryptjs');
const { reset } = require("nodemon");
const saltRounds = 10;


router.get('/userProfile', (req, res) => {
    res.render('users/user-profile');
})

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});


router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if all fields provided
    if( !username || !email || !password ) {
        const missingFields = {
            username: !username,
            email: !email,
            password: !password,
        }
        res.render("auth/signup", { errorMessage: "Please provide in all fields.", missingFields})
    }

    // Check if password is strong enough
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
      res.status(400).render('auth/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }


    bcrypt.genSalt(saltRounds)
        .then( salt => {
            return bcrypt.hash(password, salt);
        })
        .then( hashedPassword => {
            return User.create( { username, email, passwordHash: hashedPassword } );
        })
        .then( userFromDB => {
            res.redirect('/userProfile')
        })
        .catch( error => {
            if (error instanceof mongoose.Error.ValidationError) {
                // Mongoose validation error
                res.status(400).render('auth/signup', { errorMessage: error.message });
            } else if (error.code === 11000) {
                // MongoDB validation error
                res.status(400).render('auth/signup', {
                   errorMessage: 'Username and email need to be unique. Either username or email is already used.'
                });
            } else {
                console.log(error)
                next(error);
            }
        });
});

module.exports = router;