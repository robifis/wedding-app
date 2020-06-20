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

// Getting the user back from the cookie!
// First, we're passing in the ID that was serailized in the function above!
passport.deserializeUser((id, done) => {
    // We're then searching for it inside of the Userdb.
    // Once we have it we call the done function!
    // We use .then because it is an async function and it will return a promise!
    User.findById(id).then(user => {
        done(null, user);
    });
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
        (accessToken, refreshToken, profile, email, done) => {
            // Passport callback function!
            console.log("Callback fired!");
            console.log(profile);
            // Check if user already exists!
            User.findOne({ googleId: email.id }).then(currentUser => {
                if (currentUser) {
                    console.log("User exists!");
                    //Passing the through the user into the serialize function!
                    // First parameter is null and the second is the User!
                    done(null, currentUser);
                } else {
                    // Create new User!
                    new User({
                        username: email.displayName,
                        googleId: email.id,
                        email: email.emails[0].value,
                        fname: email.name.givenName,
                        lname: email.name.familyName,
                        thumbnail: email._json.picture
                    })
                        .save()
                        .then(newUser => {
                            // Important to call the done function in order
                            // to move onto the next part!
                            done(null, newUser);
                        });
                }
            });
        }
    )
);
