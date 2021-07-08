var http = require("http");
var fs = require("fs");
var socket = require("socket.io");
var Datastore = require('nedb')
var qs = require("querystring")
var formidable = require('formidable');
var session = require("client-sessions");

var Server = require("./server/server")
var Socket = require("./server/socket")

var server = new Server();
var socket = new Socket(server.server);
//Socket.init(server.server)
//var soc = require('./server/socket.js')
// *********************************************
//      zmienne
// *********************************************
// var db_users = new Datastore({ filename: 'db/users.db', autoload: true })

// var sessions = session({
//     cookieName: 'session',
//     secret: 'blargadeeblargblarg',
//     duration: 24 * 60 * 60 * 1000,
//     activeDuration: 1000 * 60 * 5
// });

// function servResponse(req, res) {
//     var allData = "";

//     //kiedy przychodzą dane POSTEM, w postaci pakietów,
//     //łącza się po kolei do jednej zmiennej "allData"
//     // w poniższej funkcji nic nie modyfikujemy

//     req.on("data", function (data) {
//         console.log("data: " + data)
//         allData += data;
//     })

//     //kiedy przyjdą już wszystkie dane
//     //parsujemy je do obiektu "finish"
//     //i odsyłamy do przeglądarki

//     req.on("end", function (data) {
//         var finish = qs.parse(allData)
//         console.log(finish)
//         db_users.find(finish, function (err, docs) {
//             console.log(docs);
//             if (docs.length > 0) {
//                 fs.readFile("static/index.html", function (error, data) {
//                     res.writeHead(200, { 'Content-Type': 'text/html' });
//                     res.end(data);
//                 })
//                 return finish[0]
//             }
//             else {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.end("Błędny login lub hasło!");
//             }
//         })

//     })
// }

// var server = http.createServer(function (req, res) {
//     // parametr res oznacza obiekt odpowiedzi serwera (response)
//     // parametr req oznacza obiekt żądania klienta (request)
//     sessions(req, res, function () {
//         // Obsługa sesji req.session.nazwa = "wartość"
//         if (req.session.login) {
//             //console.log("Istnieje " + req.session.login)
//         } else {
//             //console.log("Tworzę");
//             req.session.login = true;
//         }

//         var user
//         if (req.url == "/") {
//             fs.readFile("static/index.html", function (error, data) {
//                 res.writeHead(200, { 'Content-Type': 'text/html' });
//                 res.end(data);
//             })
//         } else if (req.url.indexOf("css") != -1) {
//             fs.readFile("static" + req.url, function (error, data) {
//                 res.writeHead(200, { 'Content-Type': 'text/css' });
//                 res.end(data);
//             })
//         }
//         else if (req.url.indexOf("js") != -1) {
//             fs.readFile("static" + req.url, function (error, data) {
//                 res.writeHead(200, { 'Content-Type': 'application/js' });
//                 res.end(data);
//             })
//         }
//         else if (req.method == "POST") {
//             if (req.url == "/login") {
//                 user = servResponse(req, res)
//                 console.log("USER: " + user);
//             } else
//                 if (req.url == "/obrazek_test") {
//                     var form = new formidable.IncomingForm();
//                     form.parse(req, function (err, fields, files) {
//                         var oldpath = files.filetoupload.path;
//                         var newpath = 'db/avatars/' + files.filetoupload.name;

//                         var rawData = fs.readFileSync(oldpath)
//                         fs.writeFile(newpath, rawData, function (err) {
//                             if (err) console.log(err)
//                             res.end("wysłano plik");
//                         })
//                         // fs.rename(oldpath, newpath, function (err) {
//                         //     if (err) throw err;
//                         //     console.log("wczytano")
//                         // });
//                     });
//                 }
//         }
//     })
// })

// io = socket(server);
// // io.use(function (socket, next){
// //     session(socket.request,{},next)
// // })
// var data = new Map();
// io.on("connection", function (socket) {
//     console.log("The client has connected!");
//     //const ses = socket.request.session;
//     //ses.connections++;
//     //ses.save();
//     //console.log(ses);
//     data.set(socket.id,{test:""})
//     //
//     var dd = data.get(socket.id)
//     dd.test += "1"
//     console.log(data.get(socket.id))
//     socket.on("login", function (data) {
//         console.log(data)
//         // czy taki użytkownik ustnieje

//         // req.session
//         socket.emit("login", { success: true });
//         // socket.emit("login", {success: false, comment: "Bad username or password"});
//     })
//     socket.on("disconnect", function () {
//         console.log("The client has disconnected!");
//         data.delete(socket.id)
//     })

//     // socket.on("event", data => {
//     // console.log(data)
//     // })
// })
///io.on("connection", soc.socket_connection)

// server.listen(3000, function () {
//     console.log("start serwera na porcie 3000")
//     db = new Datastore({ filename: 'db/test.db' })
//     db.loadDatabase(function (err) {    // Callback is optional
//         // Now commands will be executed
//         console.log("test: " + err);
//     });

//     var us = {
//         nazwa: "KPKSBW",
//         serwery: [
//             "TSSI",
//             "TALKER"
//         ]
//     }
//     db.find({ nazwa: "KSBW" }, function (err, docs) {
//         console.log(docs);
//         if (docs.length == 0) {
//             db.insert(us, function (err, newDoc) {   // Callback is optional
//                 // newDoc is the newly inserted document, including its _id
//                 // newDoc has no key called notToBeSaved since its value was undefined
//                 console.log("Nowy: " + newDoc["_id"])
//             });
//         }
//     })

// });
