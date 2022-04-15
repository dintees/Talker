const { Server } = require("socket.io");
let io = null;

module.exports = {
    Initialize: function (httpServer) {
        io = new Server(httpServer);

        // Socket support
        io.on('connection', (socket) => {
            console.log('a user connected with id:', socket.id);

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