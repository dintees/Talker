function signIn(e) {
    //e.preventDefault();
    var login = document.getElementById("login");
    var password = document.getElementById("password");

    socket.emit("login", {login: login.value, password: password.value});
}