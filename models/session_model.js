import { db } from "../tools/db.js";

export function createSession(username) {
    const id = crypto.randomUUID();
    db.prepare("INSERT INTO sessions (id, username) VALUES (?, ?)").run(id, username);
    return id;
}

export function getSession(id) {
    return db.prepare("SELECT * FROM sessions WHERE id = ?").get(id);
}

export function deleteSession(id) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(id);
}