var socket = require("socket.io");
var Datastore = require('nedb')

module.exports = class Socket {
    io
    data = new Map()
    db_users = new Datastore({ filename: 'db/users.db', autoload: true })
    constructor(server) {

        this.init(server)
    }

    init(server) {
        var io = socket(server)
        io.on("connection", this.connection.bind(this))

        this.io = io
    }
    // wersja bez bind -> this.connection(this)
    // connection(that) {
    //     return function(socket)
    //     {
    //         console.log("The client has connected!");
    //         socket.on("login", that.login(socket))
    //         socket.on("disconnect", that.disconnect)
    //     }
    // }
    connection(socket) {
        console.log("The client has connected!");
        socket.on("login", this.login(socket))
        socket.on("disconnect", this.disconnect)

    }
    login(socket) {
        let tab = this.data
        let db_users = this.db_users
        return function (data) {
            console.log(data)
            // czy taki użytkownik ustniejes
            db_users.find({login: data.login, password: data.password}, function (err, docs) {
                console.log(docs);
                if (docs.length > 0) {
                    tab.set(docs[0]._id,docs[0]);
                    console.log(tab)
                    socket.emit("login", { success: true });
                }
                else {
                    socket.emit("login", { success: false });
                }
            })
            // req.session
            
            // socket.emit("login", {success: false, comment: "Bad username or password"});
        }
    }

    disconnect() {
        console.log("The client has disconnected!");
    }
}
// io = socket(server);

// io.on("connection", function (socket) {
//     console.log("The client has connected!");
//     data.set(socket.id,{test:""})

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


