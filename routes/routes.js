const mongoose = require("mongoose");
const { decodeBase64 } = require("bcryptjs");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://user:admin@cluster0.4y4y6.mongodb.net/Cluster0?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error"));
mdb.once("open", callback =>{

});

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    question1: String,
    question2: String,
    question3: String
});

let User = mongoose.model("User_Collection", userSchema);

/*
exports.index = (req, res) => {
    User.find((err, user) => {
        if (err) return console.error(err);
        res.render("index", {
            username: user.username,
            email: user.email
        });
    });
};
*/

exports.newUser = (req, res) =>{
    res.render("form", {

    });
};

exports.newUserMade = (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
    });
};

exports.form = (req, res) => {
    res.render("form", {
        "title": "Form"
    });
    user.save((err, user) => {
        if (err) return console.error(err);
        console.log(req.body.username + " added!");
    });
    res.redirect("/");
};


exports.index = (req,res) => {
    User.find((err, user) => {
        if (err) return console.error(err);
        res.render("index", {
            users: user
        });
    })
};