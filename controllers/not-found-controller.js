import { render } from "../tools/render.js";
import { notFoundView } from "../views/not-found-view.js";

export function notFoundController(ctx) {
    return render(notFoundView, {}, ctx);
}