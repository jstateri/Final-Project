import { db } from "../tools/db.js";

export function createRoutine(username, dayNumber, label) {
    db.prepare("INSERT INTO routine (username, day_number, label) VALUES (?, ?, ?)").run(username, dayNumber, label);
    const result = db.prepare("SELECT MAX(id) as id FROM routine WHERE username = ?").get(username);
    return result.id;
}

export function saveExercises(routineId, exercises) {
    const insert = db.prepare("INSERT INTO routine_order (routine_id, exerequip_id, sets) VALUES (?, ?, ?)");

    for (const exercise of exercises) {
        insert.run(routineId, exercise.id, exercise.sets);
    }
}

export function deleteUserRoutines(username) {
    db.prepare("DELETE FROM routine WHERE username = ?").run(username);
}

export function getRoutineByUsername(username) {
    return db.prepare(`
        SELECT 
            routine.id,
            routine.day_number,
            routine.label,
            exercise.name,
            routine_order.sets
        FROM routine
        JOIN routine_order ON routine.id = routine_order.routine_id
        JOIN exercise ON routine_order.exerequip_id = exercise.id
        WHERE routine.username = ?
        ORDER BY routine.day_number
    `).all(username);
}