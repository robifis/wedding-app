// Importing Data
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating our UserSchema
const userSchema = new Schema({
    username: String,
    googleId: String
});

// Creating the model for mongoose!
const User = mongoose.model("user", userSchema);

// Exporting for further use!
module.exports = User;
