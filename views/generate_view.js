export function generateFormView({ errors = {} }) {
    return `
        <div class="container d-flex justify-content-center mt-5 pt-5">
            <div class="card p-4" style="width: 100%; max-width: 700px;">
                <h2 class="text-center">Generate Routine</h2>
                <form action="/generateroutine" method="POST">
                    <div class="mb-3">
                        <label for="equipment" class="form-label">What equipment do you want to use?</label>
                        <select class="form-select" name="equipmentUsed" id="equipment">
                            <option value="none">None</option>
                            <option value="dumbbells" selected>Dumbbells</option>
                            <option value="machine">Machine</option>
                        </select>
                        <span id="error" class="text-danger">${errors.equipmentUsed?.message || ""}</span>
                    </div>
                    <div class="mb-3">
                        <label for="time" class="form-label">How many minutes per session?</label>
                        <select class="form-select" name="timeLimit" id="time">
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80" selected>80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                            <option value="110">110</option>
                            <option value="120">120</option>
                        </select>
                        <span id="error" class="text-danger">${errors.timeLimit?.message || ""}</span>
                    </div>
                    <div class="mb-3">
                        <label for="days" class="form-label">How many days a week do you want to workout?</label>
                        <select class="form-select" name="daysWeek" id="days">
                            <option value="3">3</option>
                            <option value="4" selected>4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <span id="error" class="text-danger">${errors.daysWeek?.message || ""}</span>
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary">Generate</button>
                    </div>
                </form>
            </div>
        </div>
    `
}