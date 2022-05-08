const { Server } = require("socket.io");
let io = null;

module.exports = {
    connectedUsers: [],

    Initialize: function (httpServer) {
        io = new Server(httpServer);

        // Socket support
        io.on('connection', (socket) => {
            console.log('a user connected with id:', socket.id);
            // this.connectedUsers.push(socket.id)

            socket.on('handshake', data => this.connectedUsers.push(data))

            socket.on('chat', data => {
                console.log("User with id: " + data.senderID + " has sent the message " + data.message + " to the user with id: " + data.receiverID);

                // socket.to(socket_id).emit("Hello world!");
            })

            socket.on('test', msg => {
                console.log(" --- SOCKET TEST ---")
                console.log(msg);
            })

            socket.on('disconnect', (reason) => {
                console.log("user disconnected with id:", socket.id, "reason:", reason);
            })
        });
    },

    GetInstance: function() {
        return io;
    }
}