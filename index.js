// Import modules
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const Datastore = require('nedb');

// File modules
var Database = require('./modules/Database');

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
            break;
        case "register":
            console.log("Register action");
            break;

        default:
            obj = { success: false, message: "Unknown command" }
    }
    res.send(obj)
})


app.listen(port, () => {
    console.log("Server is listening on port " + port);
});