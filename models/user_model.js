import { db } from "../tools/db.js";
import { hashPassword, verifyPassword } from "../tools/hash.js";

export function getUserByUsername(username) {
    return db.prepare(
        "SELECT * FROM users WHERE username = ?"
    ).get(username);
}

export async function createUserWithPassword({username, password}) {
    const hashedPassword = await hashPassword(password);
    db.prepare("INSERT INTO users (username, hashedPassword) VALUES(:username, :hashedPassword)").run({username, hashedPassword});
}

export async function validateCredentials({username, password}) {
    const user = getUserByUsername(username);
    const ok = user && await verifyPassword(password, user.hashedPassword);
    const err = {
        credentials: !ok && "Problem with username and/or password"
    }
    return { ok, err };
}