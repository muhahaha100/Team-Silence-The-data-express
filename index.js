const express = require("express");
const pug = require("pug");
const path = require("path");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));

let urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get("/", routes.index);
app.get("/newUser", routes.newUser);
app.post("/newUser", urlencodedParser, routes.newUserMade);
//app.get("/newUser:id", routes.differentRoute);

app.listen(3000);