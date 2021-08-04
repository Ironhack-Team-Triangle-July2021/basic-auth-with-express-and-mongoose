const router = require("express").Router();

const User = require('../models/User.model');

const bcrypt = require('bcryptjs');
const saltRounds = 10;


router.get('/userProfile', (req, res) => {
    res.render('users/user-profile');
})

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});


router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

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
});

module.exports = router;