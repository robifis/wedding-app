const router = require("express").Router();
const passport = require("passport");

// Route to get get to Login Options
router.get("/login", (req, res) => {
    res.render("login");
});

// Route to get get to Register Options
router.get("/register", (req, res) => {
    res.render("register");
});

// Route to log in with Google!
router.get(
    "/login/google",
    passport.authenticate("google", {
        // Specifying the information we want from Google
        scope: ["profile", "email"]
    })
);

// Redirect Route for Google once logged in!
// This function here is what triggers all the serialisation etc for the user!
router.get(
    "/login/google/redirect",
    // The code below is needed to send the code back (from the URL) to google to retrieve the info
    // After the passport.authenticate function fires, the callback function fires that's inside
    // of the passport-setup.js file!
    passport.authenticate("google"),
    (req, res) => {
        // Once the user has logged in, we are able to access their
        // information in the req object! So all the information that
        // the user has provided to us is now available for
        // us to use!
        // It is accessed via req.user
        res.redirect("/profile/user");
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;
