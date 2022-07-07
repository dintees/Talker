var Database = require('./Database')
module.exports = {
    Login: function (req, users) {
        return new Promise(resolve => {
            if (req.body.login == "" && req.body.password == "") resolve({ action: "login", success: false, message: "Empty login or password" });
            else {
                Database.SelectOne(users, { login: req.body.login, password: req.body.password }, (err, data) => {
                    // console.log(data);
                    if (data) {
                        // Logged in successfully
                        delete data.password;
                        resolve({ action: "login", success: true, user: data }) // send data to the client

                        this.SetSession(req, { loggedIn: true, user: data }) // set session
                    }
                    else resolve({ action: "login", success: false, message: "Incorrect login or password" })
                })
            }
        })
    },

    Register: function (req, users) {
        return new Promise(resolve => {
            if (req.body.login == '' || req.body.password == '' || req.body.email == '') {
                resolve({ action: 'register', success: false, message: 'Empty fields in the form.' })
                return;
            }
            if (req.body.password == req.body.password2) {
                Database.SelectOne(users, { login: req.body.login }, (err, doc) => {
                    if (doc) resolve({ action: "register", success: false, message: "There is a user with the same login" })
                    else {
                        Database.SelectOne(users, { email: req.body.email }, (err, doc) => {
                            if (doc) resolve({ action: "register", success: false, message: "There is a user with the same email" })
                            else {
                                let user = { login: req.body.login, password: req.body.password, email: req.body.email, friendsList: [] }
                                Database.Insert(users, user, (err, newDoc) => {
                                    if (!err) {
                                        delete newDoc.password;
                                        this.SetSession(req, { loggedIn: true, user: newDoc })
                                        resolve({ action: "register", success: true, user: newDoc })
                                    }
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

    LogOut: function (req) {
        req.session.destroy(err => {
            if (err) return ({ action: 'logout', success: false, message: 'Something went wrong. Not logged out.', error: err })
            else return ({ action: 'logout', success: true });
        })
    },

    CheckIfUserLoggedIn: function (req) {
        if (this.GetSession(req, 'loggedIn')) return ({ action: 'check', success: true, loggedIn: true })
        else return ({ action: 'check', success: true, loggedIn: false })
    },

    CheckUser: function (req) {
        return (this.GetSession(req, 'loggedIn'));
    },

    SetSession: function (req, obj) {
        for (const [key, value] of Object.entries(obj))
            req.session[key] = value;
    },

    GetSession: function (req, name) {
        return req.session[name];
    },

    GetUserID: function (req) {
        if (this.CheckUser(req)) {
            let id = this.GetSession(req, 'user')._id;
            if (id) return { success: true, userID: id }
            else return { success: false, message: "Something went wrong." }
        }
    },

    GetFriendsList: function (req, users) {
        return new Promise(resolve => {
            if (this.CheckUser(req)) {
                Database.Select(users, { friendsList: this.GetSession(req, 'user')._id }, (err, docs) => {
                    if (err) resolve({ action: 'getFriendsList', success: false })
                    else {
                        // deleting fields -> to improve -> add name, surname and avatar (in registration)
                        docs.forEach(o => {
                            delete o.password;
                            delete o.email;
                        })
                        resolve({ action: 'getFriendsList', success: true, users: docs })
                    }
                });

                // for all users, wothout friends
                // Database.Select(users, { $not: {login: this.GetSession(req, 'user').login} }, (err, docs) => {
                //     if (err) resolve({ action: 'getFriendsList', success: false })
                //     else {
                //         // deleting fields -> to improve -> add name, surname and avatar (in registration)
                //         docs.forEach(o => {
                //             delete o.password;
                //             delete o.email;
                //         })

                //         resolve({ action: 'getFriendsList', success: true, users: docs })
                //     }
                // })
            }
        })
    },

    MakeFriends: function (req, addOrDelete, users) {
        // addOrDelete - true: add; false: delete
        return new Promise((resolve, reject) => {
            if (this.CheckUser(req)) {
                Database.SelectOne(users, { _id: this.GetSession(req, "_id") }, (err, doc) => {
                    // console.log(doc.friendsList);
                    if (addOrDelete) { // making friends
                        if (doc.friendsList.indexOf(req.body.userID) == -1) {
                            doc.friendsList.push(req.body.userID)
                            Database.Update(users, { _id: this.GetSession(req, "_id") }, { friendsList: doc.friendsList }, (err, numUpdated) => {
                                resolve({ success: true, updatedRows: numUpdated });
                            })
                        }
                    } else { // deleting friends
                        if (doc.friendsList.indexOf(req.body.userID) != -1) {
                            doc.friendsList.splice(doc.friendsList.indexOf(req.body.userID), 1);
                            Database.Update(users, { _id: this.GetSession(req, "_id") }, { friendsList: doc.friendsList }, (err, numUpdated) => {
                                resolve({ success: true, updatedRows: numUpdated });
                            })
                        }
                    }
                })
            }
        })
    },

    GetMessages: function (req, receiverID, messagesColl) {
        return new Promise((resolve, reject) => {
            if (this.CheckUser(req)) {
                Database.SelectAndLimit(messagesColl, { $or: [{ senderID: this.GetSession(req, 'user')._id, receiverID: receiverID }, { senderID: receiverID, receiverID: this.GetSession(req, 'user')._id }] }, { time: -1 }, 20, (err, docs) => {
                    if (err) {
                        reject({ success: false })
                    } else {
                        docs.forEach(o => {
                            delete o.receiverID
                        })
                        docs.sort((a, b) => a.time - b.time)
                        resolve({ action: 'getMessage', success: true, messages: docs })
                    }
                })
            } else {
                reject({ success: false, message: "User not logged in" })
            }
        })
    },
}