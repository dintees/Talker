const http = require('http');
const httpServer = http.createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const SessionStore = require('./sessionStore')
const sessionStore = new SessionStore()

const generateID = () => {
  const chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        return next();
      }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.sessionID = generateID();
  socket.userID = generateID();
  socket.username = username;
  next();
});

io.on("connection", (socket) => {

  // save session
  sessionStore.saveSession(socket.sessionID, { userID: socket.userID, username: socket.username, online: true })

  socket.emit("session", { sessionID: socket.sessionID, userID: socket.userID })

  socket.join(socket.userID)
  const users = [];
  sessionStore.getAllSessions().forEach(session => {
    users.push({
      userID: session.userID,
      username: session.username,
      online: session.online,
      messages: []
    })
  })
  // for (let [id, socket] of io.of("/").sockets) {
    // users.push({ userID: id, username: socket.username, online: true, messages: [] })
  // }
  socket.emit("connectedUsers", users);

  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
    online: true,
    messages: []
  });

  socket.on("private message", ({ to, content }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      from: socket.userID,
      content,
      to
    });
  });

  socket.on("disconnect", async reason => {
    const sockets = await io.in(socket.userID).allSockets();
    if (sockets.size === 0) {
      socket.broadcast.emit("user disconnected", socket.userID)
    }
    
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      username: socket.username,
      online: false
    })
  })
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () =>
  console.log(`httpServer listening at http://localhost:${PORT}`)
);