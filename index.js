var http = require("http");
var fs = require("fs");
var socket = require("socket.io");

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
});
