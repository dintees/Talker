var socket = io();

window.onload = function () {
    console.log("Załadowano");


    socket.on("connect", () => {
        // client has connected

        socket.on("login", function(data) {
            console.log(data)
        })

        // socket.emit("test", "Ala ma kota")
    })
}
//https://jsfiddle.net/SupunKavinda/vfxdwtpc/1/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.files.length == 0)
        return
    var plik = ev.dataTransfer.files[0]
    console.log(ev.dataTransfer)
    console.log(plik)
    var input = document.getElementById("obrazko-chwytacz")
    input.value = "ss"
    console.log(input.value)
}

function dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                var file = ev.dataTransfer.items[i].getAsFile();
                console.log(file)
                console.log('... file[' + i + '].name = ' + file.name);
            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }
}
function dragOverHandler(ev) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}