// Import modules
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Datastore = require('nedb');
const session = require('express-session');

// File modules
var Database = require('./modules/Database');
var ApiQuery = require('./modules/ApiQuery');

// Databases
var users = new Datastore({ filename: "db/users.db", autoload: true });

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
    cookie: { secure: true, maxAge: 3600 }
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

        case 'logout':
            res.send(ApiQuery.LogOut(req));

        case "check":
            ApiQuery.CheckIfUserLoggedIn(req).then(data => res.send(data));
        break;

        default:
            res.send({ success: false, message: "Unknown command" })
    }

})

// preventing refreshing page -> using Angular routing
app.use('*', (req, res) => { res.sendFile(path.join(__dirname, 'book/dist/book/index.html'))});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// app.listen(PORT, () => {
//     console.log("Server is listening on PORT " + PORT);
// });