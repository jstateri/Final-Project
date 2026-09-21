import { serveDir } from "@std/http/file-server";
import { homeController } from "./controllers/home_controller.js";
import { notFoundController } from "./controllers/not-found-controller.js";
import { loginFormController, logoutController, loginController } from "./controllers/login_controller.js";
import { registerFormController, registrationController } from "./controllers/register_controller.js";
import { currentSession } from "./tools/auth.js";
import { generateFormController, generateWorkout } from "./controllers/generate_controller.js";
import { routineController } from "./controllers/routine_controller.js";

export async function handler(request) {

    const session = await currentSession(request);
    const ctx = {request, session };
    const url = new URL (request.url);
    const pathname = url.pathname;
    const method = request.method;

    if (pathname.includes(".")) {
        return serveDir(request, { fsRoot: "public" });
    };

    if (pathname === "/") return loginFormController(ctx);
    if (pathname === "/login") return loginFormController(ctx);
    if (pathname === "/register") return registerFormController(ctx);
    if (pathname === "/users" && method === "POST") return registrationController(ctx);

    if (pathname == "/sessions" && method === "POST") return loginController(ctx);
    if (pathname === "/logout" && method === "POST") return logoutController(ctx);

    if (pathname === "/generateroutine" && method === "GET") return generateFormController(ctx);
    if (pathname === "/generateroutine" && method === "POST") return generateWorkout(ctx);

    if (pathname === "/routine" && method === "GET") return routineController(ctx);



    return notFoundController(ctx)

}