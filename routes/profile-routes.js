const router = require("express").Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect("auth/login");
    } else {
        next();
    }
};

router.get("/user", authCheck, (req, res) => {
    // We have access to req.user here so we can access all the userdata we want!
    // We are therefore passing down the whole user object from our db!
    res.render("user", {
        user: {
            fname: req.user.fname,
            lname: req.user.lname,
            email: req.user.email,
            thumbnail: req.user.thumbnail
        }
    });
});

module.exports = router;
