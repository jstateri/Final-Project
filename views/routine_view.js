export function routineView({ days  = {} }) {
    const dayCards = Object.entries(days).map(([dayNumber, session]) => {
        const exerciseItems = session.exercises.map(exercise => `
            <li class="py-1 border-bottom">${exercise.name} x ${exercise.sets}</li>
        `).join("");

        return `
            <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                <div class="card p-4 h-100">
                    <p class="text-muted mb-1" style="font-size: 13px;">Day ${dayNumber}</p>
                    <h5 class="mb-3">${session.label}</h5>
                    <ul class="list-unstyled mt-2 mb-0">
                        ${exerciseItems}
                    </ul>
                </div>
            </div>
        `;
    }).join("");

    return `
        <div class="container mt-5 pt-5">
            <h2 class="mb-4 text-center">My Routine</h2>
            <div class="row g-3 justify-content-center">
                ${dayCards}
            </div>
        </div>
    `;
}
