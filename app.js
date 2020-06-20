const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const authRouter = require("./routes/auth-routes");
const profileRouter = require("./routes/profile-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/google-keys");
const cookieSession = require("cookie-session");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Connect to MongoDB
mongoose.connect(
    keys.mongodb.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

// Cookies!
app.use(
    cookieSession({
        // the object takes two parameters, maxAge (1 day in our case)
        // and a key which is stored inside of the keys file!
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    })
);

// Initialize passport!
app.use(passport.initialize());
app.use(passport.session());
// The above functions are neccessary to combine to be able to check if the user is already logged in or not.
// This works in tandem with the serializeUser and deserializeUser function in the passport-setup.js
// file. First we need to serialize the user and then pass it over to the browser!

// Code order is important because code is executed in order!
app.get("/", function (req, res) {
    res.render("home", { user: req.user });
});

app.get("/about", (req, res) => {
    res.render("about");
});

// Link to Router Links for login!
app.use("/auth", authRouter);

// Profile Router!
app.use("/profile", profileRouter);

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.listen(port, () => {
    console.log("Server running on " + port);
});
