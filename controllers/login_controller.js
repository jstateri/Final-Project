import { render } from "../tools/render.js";
import { loginFormView } from "../views/login_view.js";
import { redirect } from "../tools/redirect.js";
import { validateSchema } from "../tools/validation.js";
import { validateCredentials } from "../models/user_model.js";
import { userSchema } from "../schema/user-schema.js";
import { login, logout } from "../tools/auth.js";

export function loginFormController(ctx) {
    if (ctx.session) return redirect("/routine", "You must be logged out to access this page");
    return render(loginFormView, {}, ctx);
}

export async function loginController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    const { isValid, errors, validated } = validateSchema(formData, userSchema);

    if(!isValid) return render(loginFormView, { errors }, ctx);

    const {ok, err} = await validateCredentials(validated);
    if (!ok) {
        return render(loginFormView, { errors: { ...err, ...errors } }, ctx);
    }
    
    const headers = new Headers();
    login(headers, validated.username);
    return redirect("/routine", `logged in as '${validated.username}'`, headers);
}



export function logoutController(ctx) {
    const { session, request } = ctx;
    const headers = new Headers();
    if(session) logout(headers, request);
    return redirect("/", "logged out", headers);
}