var http = require("http");
var fs = require("fs");
var socket = require("socket.io");
var Datastore = require('nedb')

var server = http.createServer(function (req, res) {
    // parametr res oznacza obiekt odpowiedzi serwera (response)
    // parametr req oznacza obiekt żądania klienta (request)

    if (req.url == "/") {
        fs.readFile("static/index.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    } else if (req.url.indexOf("css") != -1) {
        fs.readFile("static" + req.url, function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        })
    }
    else if (req.url.indexOf("js") != -1) {
        fs.readFile("static" + req.url, function (error, data) {
            res.writeHead(200, { 'Content-Type': 'application/js' });
            res.end(data);
        })
    }
})

io = socket(server);

io.on("connection", function (socket) {
    console.log("The client has connected!");
    socket.on("disconnect", function () {
        console.log("The client has disconnected!");
    })

    // socket.on("event", data => {
        // console.log(data)
    // })
})


server.listen(3000, function () {
    console.log("start serwera na porcie 3000")



    // ********************************
    //      Nedb test ---- https://www.npmjs.com/package/nedb
    // ********************************
    db = new Datastore({filename: 'static/bazy/test.db'})
    db.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
        console.log("test: "+err);
      });

    var us = {
        nazwa: "KSBW",
        serwery: [
            "TSSI",
            "TALKER"
        ]
    }
    db.find({nazwa:"KSBW"},function(err,docs){
        console.log(docs);
        if(docs.length == 0)
        {
            db.insert(us, function (err, newDoc) {   // Callback is optional
                    // newDoc is the newly inserted document, including its _id
                    // newDoc has no key called notToBeSaved since its value was undefined
                    console.log("Nowy: " + newDoc["_id"])
                });
        }
    })
    

    
    
});
