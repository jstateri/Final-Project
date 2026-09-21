import { render } from "../tools/render.js";
import { createUserWithPassword, getUserByUsername } from "../models/user_model.js";
import { validateSchema } from "../tools/validation.js";
import { userSchema } from "../schema/user-schema.js";
import { redirect } from "../tools/redirect.js";
import { login } from "../tools/auth.js";
import { registerFormView } from "../views/register_view.js";

export function registerFormController(ctx) {
    return render(registerFormView, {}, ctx);
}

export async function registrationController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    const { isValid, errors, validated } = validateSchema(formData, userSchema);

    if(!isValid) {
        return render(registerFormView, { errors }, ctx);
    }

    //
    const usernameExists = getUserByUsername(validated.username);

    if (usernameExists){
        errors.username = {
            value: validated.username, message: "Username is taken"
        }
        return render(registerFormView, { errors }, ctx);
    }

    await createUserWithPassword(validated);
    const headers = new Headers();
    login(headers, validated.username);
    return redirect("/", "User created", headers);
}