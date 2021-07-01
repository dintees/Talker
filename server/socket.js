var socket = require("socket.io");

function socket_connection(socket) {
    console.log("The client has connected!");
    socket.on("login", socket_login)
    socket.on("disconnect", socket_disconnect)

    // socket.on("event", data => {
    // console.log(data)
    // })
}
function socket_login(data) {
    console.log(data)
    // czy taki użytkownik ustnieje

    // req.session
    socket.emit("login", { success: true });
    // socket.emit("login", {success: false, comment: "Bad username or password"});
}

function socket_disconnect() {
    console.log("The client has disconnected!");
}





exports.socket_connection = socket_connection
exports.socket_login = socket_login
exports.socket_disconnect = socket_disconnect
