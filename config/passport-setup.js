const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./google-keys");
// Importing Users from Schema
const User = require("../models/user-model");

// Setting Up the Google Passport Strategy!
passport.use(
    new GoogleStrategy(
        {
            // Passport config options
            callbackURL: "/auth/login/google/redirect",
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        (profile, done) => {
            // Passport callback function!
            new User({
                username: profile.displayName,
                googleId: profile.id,
            }).save().then((newUser) => {
                console.log(newUser)
            });
        }
    )
);
