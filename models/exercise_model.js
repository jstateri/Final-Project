import { db } from "../tools/db.js";

export function getExerciseByEquipment(equipment) {
    return db.prepare(`
        SELECT 
            exercise.id,
            exercise.name,
            exercise.target_muscle,
            exercise.secondary_muscle
        FROM exercise 
        JOIN exercise_equipment ON exercise.id = exercise_equipment.exercise_id
        JOIN equipment ON exercise_equipment.equipment_id = equipment.id
        WHERE equipment.name = ?
    `).all(equipment);
}
