export function render(viewFunction, viewData = {}, ctx) {
    const { session, status=200 } = ctx;
	const content = viewFunction(viewData);
    const sessionMessage = session ? `Logged in as ${session.username}` : "";
    const authNav = session
		? `<form method="POST" action="/logout" class="m-0"><button type="submit" class="btn btn-primary">Logout</button></form>`
		: `<a href="/login" class="btn btn-primary">Login</a>`;

    const linkNav = session
        ? `<li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="/generateroutine">Generate Routine</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/routine">My routine</a>
                                </li>`
        : ``;
    

    return new Response(
        `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <title>Workout Generator</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <a class="navbar-brand" href="/">Workout Generator</a>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                ${linkNav}
                            </ul>

                            <div class="d-flex">
                                ${authNav}
                            </div>
                        </div>
                    </div>
                </nav>
                
                <main>
                    ${content}
                </main>


                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </body>
        </html>`,
            { headers: { "content-type": "text/html; charset=utf-8" } }
    );

}