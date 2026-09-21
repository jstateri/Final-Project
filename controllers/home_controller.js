import { render } from "../tools/render.js";
import { homeView } from "../views/home_view.js";

export function homeController(ctx) {
    return render(homeView, {}, ctx);
}