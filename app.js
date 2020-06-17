const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const authRouter = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/google-keys");

// Link to Router Links for login!
app.use("/auth", authRouter);

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Connect to MongoDB
mongoose.connect(keys.mongodb.mongoURI, () => {
    console.log("Connected to MongoDB");
});

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.listen(port, () => {
    console.log("Server running on " + port);
});
