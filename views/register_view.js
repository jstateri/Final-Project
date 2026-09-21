export function registerFormView({ errors = {} }) {
    return `
    <div class="container d-flex justify-content-center mt-5 pt-5">
        <div class="card p-4" style="width: 100%; max-width: 500px;">
            <h2 class="text-center">Register</h2>
            <p>
                Already have an account?
                <a href="/login">Sign in here</a>
            </p>
            <form action="/users" method="POST">
                <div class="row mb-3">
                    <label for="username" class="col-sm-3 col-form-label">Username</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="username" name="username" value="${errors.username?.value || ""}" required>
                        <span id="error" class="text-danger">${errors.username?.message || ""}</span>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="password" class="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-9">
                        <input type="password" class="form-control" id="password" name="password" value="${errors.password?.value || ""}" required>
                        <span id="error" class="text-danger">${errors.password?.message || ""}</span>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Sign up</button>
                </div>
            </form>
        </div>
    </div>
    `
}