const express = require("express");
const pug = require("pug");
const path = require("path");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cookieParser("secret"));
app.use(express.static(path.join(__dirname + "/public")));


let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

const checkAuth = (req, res, next) =>{
    if (req.session.user && req.session.user.isAuthenticated){
        next();
    }else{
        res.redirect("/");
    }
};

app.use(expressSession({
    secret: "super",
    saveUninitialized: true,
    resave: true
}));

app.get("/", routes.index);
app.post("/profileFinishedEditting", checkAuth, urlencodedParser, routes.finishedEditing)
app.post("/editProfile", checkAuth, urlencodedParser, routes.editProfile);
app.get("/private",checkAuth, routes.private);
app.get("/login", routes.login);
app.post("/login",urlencodedParser, routes.loginActually);
app.post("/logout", urlencodedParser, routes.logout);
app.get("/newUser", routes.newUser);
app.post("/newUser", urlencodedParser, routes.newUserMade);
app.get("/api", routes.api);
//app.get("/newUser:id", routes.differentRoute);

app.listen(3000);