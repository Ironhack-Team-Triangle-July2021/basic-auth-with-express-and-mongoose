
// If user not logged in, redirect to login form
const isLoggedIn = (req, res, next) => {
    if(!req.session.currentUser){
        res.redirect('/login');        
    }
    next();
}

// If user already logged in, redirect to homepage
const isLoggedOut = (req, res, next) => {
    if(req.session.currentUser){
        res.redirect('/')
    }
    next();
}


module.exports = { isLoggedIn, isLoggedOut };