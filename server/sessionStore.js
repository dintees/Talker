module.exports = class SessionStore {
    constructor() {
        this.sessions = new Map();
    }

    findSession(id) {
        return this.sessions.get(id);
    }

    saveSession(id, session) {
        this.sessions.set(id, session);
    }

    getAllSessions() {
        return [...this.sessions.values()]
    }
}