const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./google-keys");
// Importing Users from Schema
const User = require("../models/user-model");

// Searilizing and deSerializing Users!
// Reason we're doing this is to store the ID in a cookie!
passport.serializeUser((user, done) => {
    // This function is called after the DONE function is called inside of the 
    // if statement! This is how we can get the user.id variable from the current User!
    done(null, user.id);
});

// Setting Up the Google Passport Strategy!
passport.use(
    new GoogleStrategy(
        {
            // Passport config options
            callbackURL: "/auth/login/google/redirect",
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        // Callback function. Fires after the function above has fired!
        (accessToken, refreshToken, email, profile, done) => {
            // Passport callback function!
            // Saving new User once we get the information back!
            console.log("Callback fired!");
            // Check if user already exists!
            User.findOne({ googleId: profile.id }).then(currentUser => {
                // If current user already exists then redirect home!
                if (currentUser) {
                    //Passing the through the user into the serialize function!
                    // First parameter is null and the second is the User!
                    done(null, currentUser)
                    console.log("Current user is" + currentUser.fname);
                } else {
                    // Create new User!
                    new User({
                        // Data used to save the username and the googleID!
                        username: profile.displayName,
                        googleId: profile.id,
                        // Saving personal data such as email and full name!
                        email: profile.emails[0].value,
                        fname: profile.name.givenName,
                        lname: profile.name.familyName
                    })
                        .save()
                        .then(newUser => {
                            console.log("User Saved to Database!");
                            console.log(newUser);
                        });
                }
            });
        }
    )
);
