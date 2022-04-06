var Database = require('./Database')
module.exports = {
    Login: function (req, users) {
        return new Promise(resolve => {
            console.log(" - LOGIN - ");
            if (req.body.login == "" && req.body.password == "") resolve({ action: "login", success: false, message: "Empty login or password" });
            else {
                Database.SelectOne(users, { login: req.body.login, password: req.body.password }, (err, data) => {
                    // console.log(data);
                    if (data) { 
                        // Logged in successfully
                        delete data.password;
                        resolve({ action: "login", success: true, user: data }) // send data to the client

                        this.SetSession(req, {loggedIn: true, user: data}) // set session
                    }
                    else resolve({ action: "login", success: false, message: "Incorrect login or password" })
                })
            }
        })
    },

    Register: function (req, users) {
        console.log(" - REGISTER - ");
        return new Promise(resolve => {
            if (req.body.password == req.body.password2) {
                Database.SelectOne(users, { login: req.body.login }, (err, doc) => {
                    if (doc) resolve({ action: "register", success: false, message: "There is a user with the same login" })
                    else {
                        Database.SelectOne(users, { email: req.body.email }, (err, doc) => {
                            if (doc) resolve({ action: "register", success: false, message: "There is a user with the same email" })
                            else {
                                let user = { login: req.body.login, password: req.body.password, email: req.body.email }
                                Database.Insert(users, user, (err, newDoc) => {
                                    if (newDoc) { delete newDoc.password; resolve({ action: "register", success: true, user: newDoc }) }
                                    else resolve({ action: "register", success: false, message: "Error while adding new user" })
                                })
                            }
                        })
                    }
                })
            } else {
                resolve({ action: "register", success: false, message: "The passwords are not identical" })
            }
        })
    },

    LogOut: function(req) {
        if (delete req.session) return ({ action: 'logout', success: true });
        else return ({ action: 'logout', success: false, message: 'Something went wrong. Not logged out.'})
    },

    CheckIfUserLoggedIn: function(req) {
        if (this.GetSession(req, 'loggedIn')) return ({ action: 'check', success: true, loggedIn: true })
        else return ({ action: 'check', success: true, loggedIn: false })
    },

    SetSession: function (req, obj) {
        for (const [key, value] of Object.entries(obj))
            req.session[key] = value;
    },

    GetSession: function (req, name) {
        return req.session[name];
    },
}