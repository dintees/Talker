// Import modules
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const Datastore = require('nedb');

// File modules
var Database = require('./modules/Database');
const { redirect } = require('express/lib/response');

// Databases
var users = new Datastore({ filename: "db/users.db", autoload: true });

// Load Angular files
app.use(express.static(path.join(__dirname, './book/dist/book')))

// Use POST method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/query', (req, res) => {
    console.log(req.body);
    let obj = {};
    switch (req.body.action) {
        case "login":
            console.log("Login action");
            if (req.body.login == "" && req.body.password == "") res.send({ action: "login", success: false, message: "Empty login or password" });
            else {
                Database.SelectOne(users, { login: req.body.login, password: req.body.password }, (err, data) => {
                    console.log(data);
                    if (data) { delete data.password; res.send({ action: "login", success: true, user: data }) }
                    else res.send({ action: "login", success: false, message: "Incorrect login or password." })
                })
            }
            break;

        case "register":
            console.log("Register action");
            if (req.body.password == req.body.password2) {
                Database.SelectOne(users, { login: req.body.login }, (err, doc) => {
                    if (doc) res.send({ action: "register", success: false, message: "There is a user with the same login." })
                    else {
                        Database.SelectOne(users, { email: req.body.email }, (err, doc) => {
                            if (doc) res.send({ action: "register", success: false, message: "There is a user with the same email." })
                            else {
                                let user = { login: req.body.login, password: req.body.password, email: req.body.email }
                                Database.Insert(users, user, (err, newDoc) => {
                                    if (newDoc) { delete newDoc.password; res.send({ action: "register", success: true, user: newDoc }) }
                                    else res.send({ action: "register", success: false, message: "Error while adding new user." })
                                })
                            }
                        })
                    }
                })
            } else {
                res.send({ action: "register", success: false, message: "The passwords are not identical." })
            }
            break;

        default:
            obj = { success: false, message: "Unknown command" }
            res.send(obj)
    }
})


app.listen(port, () => {
    console.log("Server is listening on port " + port);
});