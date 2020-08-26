const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


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
        loggedIn: req.session.user
    });
};


//let salt = bcrypt.genSaltSync(10);
//let hash = bcrypt.hashSync("bacon", salt);

//console.log(salt);
//console.log(hash);

//console.log(bcrypt.compareSync("bacon", hash));
//console.log(bcrypt.compareSync("veggies", hash));
let salt = bcrypt.genSaltSync(10);

exports.newUserMade = (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, salt);
    let user = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        age: req.body.age,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
    });
    user.save((err, user) => {
        if (err) return console.error(err);
        console.log(req.body.username + " Added");
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        };
        res.redirect("/private");
    });
};

exports.editProfile = (req,res) => {
    res.render("profile", {
        loggedIn: req.session.user,
        title: req.session.user.username
    });
};

exports.finishedEditing = (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, salt);
    let id = "";
    User.find((err, user) =>{
        if (err) return console.error(err);
        for(i=0; i<user.length; i++){
            if (user[i]["username"] == req.session.user.username){
                id = user[i]["_id"]
                break;
            }
        }
        User.findById(id, (err2, user2) =>{
            if (err2) return console.error(err2);
            user2.username = req.body.username;
            user2.password = hash;
            user2.email = req.body.email;
            user2.age = req.body.age;
            user2.question1 = req.body.question1;
            user2.question2 = req.body.question2;
            user2.question3 = req.body.question3;
    
            user2.save((err3, user3) => {
                if (err3) return console.error(err3);
                console.log("Updated!");
            });
            req.session.user = {
                isAuthenticated: true,
                id: id,
                username: req.body.username
            };
            res.redirect("/private");
        });
    });
};

exports.login = (req, res) => {
    res.render("login", {
        loggedIn: req.session.user
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
    User.findById(req.session.user.id,(err, user) => {
        if (err) return console.error(err);

        
        res.render("private", {
            loggedIn: req.session.user,
            secretUser: req.session.user.username,
            username: user.username,
            email: user.email,
            age: user.age,
            question1: user.question1,
            question2: user.question2,
            question3: user.question3
        });
    });
};

exports.loginActually = (req, res) => {
    console.log("OMG");
    User.find((err, user) =>{
        if (err) return console.error(err);

        let indexFound = -1;
        console.log("um");
        for(i = 0; i < user.length; i++){
            if (user[i]["username"] == req.body.username){
                if (bcrypt.compareSync(req.body.password, user[i]["password"])){
                    indexFound = i;
                    break;
                }
            }
        }

        if (indexFound > -1){
            req.session.user = {
                isAuthenticated: true,
                id: user[indexFound]["_id"],
                username: req.body.username
            }
            console.log("question mark");
            console.log(req.session.user);
            console.log(req.session.user.id);
            res.redirect("/private");
        }else{
            res.redirect("/login");
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
            loggedIn: req.session.user,
            lastTime: response
        });
    });
};