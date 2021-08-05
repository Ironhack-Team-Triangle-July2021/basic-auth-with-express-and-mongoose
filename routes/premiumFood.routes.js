const router = require("express").Router();

router.get('/foodlist', (req, res) => {
    if(req.session.currentUser){
        res.render('foods/foodlist');
    }else {
        res.redirect('/login');
    }
});

module.exports = router;