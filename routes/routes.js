const mongoose = require("mongoose");

//const bcrypt = require("bcryptjs");

//let salt = bcrypt.genSaltSync(10);
//let hash = bcrypt.hashSync("bacon", salt);

//console.log(salt);
//console.log(hash);

//console.log(bcrypt.compareSync("bacon", hash));
//console.log(bcrypt.compareSync("veggies", hash));

const { decodeBase64 } = require("bcryptjs");
const cookieParser = require("cookie-parser");
const e = require("express");
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

exports.login = (req, res) => {
    res.render("login", {

    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err){
            console.error(err);
        }else{
            res.redirect("/");
        }
    });
};

exports.private = (req, res) => {
    res.render("private", {
        secretUser: req.session.user.username
    });
}

exports.loginActually = (req, res) => {
    console.log("OMG");
    User.find((err, user) =>{
        if (err) return console.error(err);

        let indexFound = -1;
        console.log("um");
        for(i = 0; i < user.length; i++){
            if (user[i]["username"] == req.body.username){
                if (user[i]["password"] == req.body.password){
                    indexFound = i;
                    break;
                }
            }
        }

        if (indexFound > -1){
            req.session.user = {
                isAuthenticated: true,
                username: req.body.username
            }
            res.redirect("/private");
        }else{
            res.redirect("login");
            // no user with that username and password
        }
    });
};


exports.index = (req,res) => {
    User.find((err, user) => {
        if (err) return console.error(err);
        let response = "never here before";

        // thanks https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
            // really helped with this part lol
            let date = new Date();
            let day = date.getDate().toString();
            let month = (date.getMonth() + 1).toString();
            let year = date.getFullYear().toString();
            let hour = date.getHours() + 1;
            let minute = date.getMinutes();
            let seconds = date.getSeconds();
            let today = month + " / " + day + " / " + year + "  " + hour + ":" + minute + ":" + seconds;
        
        if (req.cookies.beenHereBefore != undefined){
            res.cookie("beenHereBefore", today, {maxAge: 999999999999999});
            response = req.cookies.beenHereBefore;
        }else{
            res.cookie("beenHereBefore", today, {maxAge: 999999999999999});
        }
        res.render("index", {
            users: user,
            lastTime: response
        });
    })
};