window.onload = function() {
    console.log("Załadowano");

    var socket = io();

    socket.on("connect", () => {
        // client has connected

        // socket.emit("test", "Ala ma kota")

    })

}