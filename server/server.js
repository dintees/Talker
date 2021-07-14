const http = require("http");
const fs = require("fs");
const formidable = require('formidable');
const session = require("client-sessions");
var qs = require("querystring")

var sessions = session({
    cookieName: 'session',
    secret: 'blargadeeblargblarg',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
});
function servResponse(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })

    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        var finish = qs.parse(allData)
        console.log(finish)
        // db_users.find(finish, function (err, docs) {
        //     console.log(docs);
        //     if (docs.length > 0) {
        //         fs.readFile("static/index.html", function (error, data) {
        //             res.writeHead(200, { 'Content-Type': 'text/html' });
        //             res.end(data);
        //         })
        //         return finish[0]
        //     }
        //     else {
        //         res.writeHead(200, { 'Content-Type': 'text/html' });
        //         res.end("Błędny login lub hasło!");
        //     }
        // })

    })
}
module.exports = class Server {
    port = 3000;
    constructor() {
        this.server = http.createServer(this.init)
        this.server.listen(this.port, this.listen)
    }
    init(req, res) {
        // parametr res oznacza obiekt odpowiedzi serwera (response)
        // parametr req oznacza obiekt żądania klienta (request)
        sessions(req, res, function () {
            // Obsługa sesji req.session.nazwa = "wartość"
            if (req.session.login) {
                //console.log("Istnieje " + req.session.login)
            } else {
                //console.log("Tworzę");
                req.session.login = true;
            }

            var user
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
            else if (req.method == "POST") {
                if (req.url == "/login") {
                    user = servResponse(req, res)
                    console.log("USER: " + user);
                } else
                    if (req.url == "/obrazek_test") {
                        var form = new formidable.IncomingForm();
                        form.parse(req, function (err, fields, files) {
                            var oldpath = files.filetoupload.path;
                            var newpath = 'db/avatars/' + files.filetoupload.name;

                            var rawData = fs.readFileSync(oldpath)
                            fs.writeFile(newpath, rawData, function (err) {
                                if (err) console.log(err)
                                res.end("wysłano plik");
                            })
                            // fs.rename(oldpath, newpath, function (err) {
                            //     if (err) throw err;
                            //     console.log("wczytano")
                            // });
                        });
                    }
            }
        })
    }
    listen() {
        console.log("start serwera na porcie 3000")
    }
}