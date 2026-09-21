import { render } from "../tools/render.js";
import { generateFormView } from "../views/generate_view.js";
import { redirect } from "../tools/redirect.js";
import { validateSchema } from "../tools/validation.js";
import { generateSchema } from "../schema/generate_schema.js";
import { getExerciseByEquipment } from "../models/exercise_model.js";
import { createRoutine, saveExercises, deleteUserRoutines } from "../models/routine_model.js"

export function generateFormController(ctx) {
    if (!ctx.session) return redirect("/login", "You must be logged in to access this page");

    return render(generateFormView, {}, ctx);
}

export async function generateWorkout(ctx){
    if (!ctx.session) return redirect("/login", "You must be logged in to access this page");

    const { request } = ctx;
    const formData = await request.formData();
    const { isValid, errors, validated } = validateSchema(formData, generateSchema);

    if(!isValid) return render(generateFormView, { errors }, ctx);

    const exerciseByEquipment = getExerciseByEquipment(validated.equipmentUsed);

    const noExercises = validated.timeLimit/10; // assumes 3 sets = 10minutes

    const exerciseByMuscle = {}; //groups exercise by muscle group

    for (const exercise of exerciseByEquipment){
        const muscle = exercise.target_muscle;
        if(!exerciseByMuscle[muscle]){
            exerciseByMuscle[muscle] = []
        }
        exerciseByMuscle[muscle].push(exercise);
    }

    const split = {
        3: ["Fullbody", "Fullbody", "Fullbody"],
        4: ["Upper", "Lower", "Upper", "Lower"],
        5: ["Push", "Pull", "Legs", "Upper", "Lower"],
        6: ["Push", "Pull", "Legs","Push", "Pull", "Legs"]
    }

    const muscleTargeted = {
        "Fullbody": ["Chest", "Back", "Quads", "Shoulders", "Biceps", "Triceps", "Abs", "Calves"],
        "Upper": ["Chest", "Back", "Shoulders", "Biceps", "Triceps"],
        "Lower": ["Quads", "Calves", "Abs"],
        "Push": ["Chest", "Shoulders", "Triceps"],
        "Pull": ["Back", "Biceps"],
        "Legs": ["Quads", "Calves", "Abs"]
    }

    const splitMuscle = split[Number(validated.daysWeek)]

    
    const weekSessions = splitMuscle.map(sessionLabel => {
        const muscles = muscleTargeted[sessionLabel];
        
        const sessionExercises = {};

        for (const muscle of muscles) {
            if (exerciseByMuscle[muscle]) {
                sessionExercises[muscle] = exerciseByMuscle[muscle];
            }
        }

        return { label: sessionLabel, exercises: sessionExercises };
    });

    //
    const weekSessionsWithSlots = [];

    for (const session of weekSessions) {
        const muscles = [];
        for (const muscle in session.exercises) {
            muscles.push(muscle);
        }

        const numberOfMuscles = muscles.length;
        const baseSlots = Math.floor(noExercises / numberOfMuscles);
        const remainder = noExercises % numberOfMuscles;

        const muscleSlots = {};

        for (let i = 0; i < muscles.length; i++) {
            const muscle = muscles[i];
            if (i < remainder) {
                muscleSlots[muscle] = baseSlots + 1;
            } else {
                muscleSlots[muscle] = baseSlots;
            }
        }

        weekSessionsWithSlots.push({ label: session.label, exercises: session.exercises, slots: muscleSlots });
    }

    const weekSessionsWithExercises = [];

    for (const session of weekSessionsWithSlots) {
        const selectedExercises = [];

        for (const muscle in session.slots) {
            const slots = session.slots[muscle];
            const availableExercises = [...session.exercises[muscle]];

            for (let i = 0; i < slots; i++) {
                if (availableExercises.length === 0) break;

                const randomIndex = Math.floor(Math.random() * availableExercises.length);
                const picked = availableExercises[randomIndex];
                availableExercises.splice(randomIndex, 1);
                selectedExercises.push(picked);
            }
        }

        weekSessionsWithExercises.push({ label: session.label, exercises: selectedExercises });
    }

    let sets;

    if (validated.timeLimit <= 50) {
        sets = 2;
    } else if (validated.timeLimit <= 80) {
        sets = 3;
    } else {
        sets = 4;
    }

    const weekSessionsWithSets = [];

    for (const session of weekSessionsWithExercises) {
        const exercisesWithSets = [];

        for (const exercise of session.exercises) {
            exercisesWithSets.push({ ...exercise, sets });
        }

        weekSessionsWithSets.push({ label: session.label, exercises: exercisesWithSets });
    }

    deleteUserRoutines(ctx.session.username);

    for (let i = 0; i < weekSessionsWithSets.length; i++) {
        const session = weekSessionsWithSets[i];
        const routineId = createRoutine(ctx.session.username, i + 1, session.label);
        saveExercises(routineId, session.exercises);
    }



    return redirect("/routine", `Routine generated`);
}