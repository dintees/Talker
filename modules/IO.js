const { Server } = require("socket.io");
var Database = require('./Database')
let io = null;

module.exports = {
    connectedUsers: new Map(),
    messages: null,
    set: function (name, val) {
        this[name] = val;
    },

    Initialize: function (httpServer) {
        io = new Server(httpServer, { pingTimeout: 10 * 60 * 1000 });

        // Socket support
        io.on('connection', (socket) => {
            console.log('a user connected with id:', socket.id);

            socket.on('handshake', data => {
                this.connectedUsers.set(data.userID, data.socketID)
                console.log(this.connectedUsers);
            })

            socket.on('chat', data => {
                // console.log("User with id: " + data.senderID + " has sent the message " + data.message + " to the user with id: " + data.receiverID);

                console.log(this.connectedUsers);
                let objToInsert = {
                    senderID: data.senderID,
                    receiverID: data.receiverID,
                    message: data.message,
                    time: new Date().getTime()
                }
                Database.Insert(this.messages, objToInsert, (err, doc) => {
                    io.to(socket.id).emit("messageSent", objToInsert);
                    if (!err) {
                        let receiverSocketID = this.connectedUsers.get(data.receiverID)
                        if (receiverSocketID) {
                            socket.to(receiverSocketID).emit("messageSent", objToInsert);
                        } // else -> user is off-line
                    }
                })
            })

            socket.on('disconnect', (reason) => {
                console.log("user disconnected with id:", socket.id, "reason:", reason);

                // delete the user from connectedUsers
                this.connectedUsers.forEach((item, key) => {
                    if (item == socket.id) this.connectedUsers.delete(key)
                })
            })
        });
    },

    GetInstance: function () {
        return io;
    }
}