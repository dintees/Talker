// Import modules
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const Datastore = require('nedb');
const session = require('express-session');

// File modules
var Database = require('./modules/Database');
var ApiQuery = require('./modules/ApiQuery');

// Databases
var users = new Datastore({ filename: "db/users.db", autoload: true });
var messages = new Datastore({ filename: "db/messages.db", autoload: true });

// Initialization of socket.io server
var io = require('./modules/IO')
io.Initialize(server);
io.set("messages", messages)

// Load Angular files
app.use(express.static(path.join(__dirname, './book/dist/book')))

// Use POST method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session support
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}))


app.post('/api/query', (req, res) => {
    console.log(req.body);
    switch (req.body.action) {
        case "login":
            ApiQuery.Login(req, users).then(data => res.send(data));
            break;

        case "register":
            ApiQuery.Register(req, users).then(data => res.send(data));
            break;

        case "logout":
            res.send(ApiQuery.LogOut(req));
            break;

        case "getFriendsList":
            ApiQuery.GetFriendsList(req, users).then(data => res.send(data));
            break;

        case "getUserID":
            res.send(ApiQuery.GetUserID(req));
            break;
            
        case "check":
            res.send(ApiQuery.CheckIfUserLoggedIn(req));
            break;

        case "getMessages":
            ApiQuery.GetMessages(req, req.body.receiverID, messages).then(data => res.send(data));
            break;

        default:
            res.send({ success: false, message: "Unknown command" })
    }

})

// preventing refreshing page -> using Angular routing
app.use('*', (req, res) => { res.sendFile(path.join(__dirname, 'book/dist/book/index.html')) });


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// app.listen(PORT, () => {
//     console.log("Server is listening on PORT " + PORT);
// });