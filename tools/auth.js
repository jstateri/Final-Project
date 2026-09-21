import { createSession, deleteSession, getSession } from "../models/session_model.js";
import { getUserByUsername } from "../models/user_model.js";
import { setCookie, getCookies, deleteCookie } from "jsr:@std/http";

export function login(headers, username) {
    const sessionId = createSession(username);
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    });
}

export function logout(headers, request) {
    const session = currentSession(request);
    deleteSession(session.id);
    deleteCookie(headers, "sessionId", { path: "/" });
}

export function currentSession(request) {
    const { sessionId } = getCookies(request.headers);
    return sessionId && getSession(sessionId)
}