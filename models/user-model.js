// Importing Data
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating our UserSchema
const userSchema = new Schema({
    username: String,
    googleId: String,
    email: String,
    fname: String,
    lname: String,
    thumbnail: String
});

// Creating the model for mongoose!
const User = mongoose.model("user", userSchema);

// Exporting for further use!
module.exports = User;
