const router = require("express").Router();
const {isLoggedIn} = require("../middleware/route-guard");


router.get('/foodlist', isLoggedIn, (req, res) => {
    res.render('foods/foodlist');
});

module.exports = router;