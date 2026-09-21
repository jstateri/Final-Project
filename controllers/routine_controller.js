import { render } from "../tools/render.js";
import { routineView } from "../views/routine_view.js";
import { redirect } from "../tools/redirect.js";
import { getRoutineByUsername } from "../models/routine_model.js";

export function routineController(ctx) {
    if (!ctx.session) return redirect("/login", "You must be logged out to access this page");

     const flatRoutine = getRoutineByUsername(ctx.session.username);

    const days = {};

    for (const row of flatRoutine) {
        if (!days[row.day_number]) {
            days[row.day_number] = { label: row.label, exercises: [] };
        }
        days[row.day_number].exercises.push({ name: row.name, sets: row.sets });
    }

    return render(routineView, { days }, ctx);
}