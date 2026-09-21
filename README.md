# Fitness Routine Generator

A web application that generates personalized workout routines based on what you actually have available - your time, equipment, and how many days a week you can train. Instead of giving you generic exercises that might not work for your situation, it builds something practical.

## Why I Built This

I got frustrated with fitness AI apps that generate routines without thinking about constraints. They'll suggest barbell exercises when you only have dumbbells, or create 60-minute routines when you only have 30 minutes free. I wanted to build something that actually listened to what a user had available and worked within those limits.

The algorithm approach matters here - I'm not using generative AI to hallucinate routines. Instead, I map your inputs to known training splits and mathematically distribute exercises to ensure balanced muscle coverage. It's deterministic, predictable, and respects your constraints.

## How It Works

The core idea is pretty straightforward:

1. **You tell it what you've got**: Time per session, equipment available, days per week
2. **It picks a split**: Based on your frequency (3 days = full body, 4 days = upper/lower, 5 days = PPL, etc.)
3. **It builds the routine**: For each day, it figures out which muscles to target, then distributes ~4000 exercises across them. The math ensures no muscle group gets shorted. It also makes sure you don't do the same exercise twice in one session.
4. **You get your routine**: Fully fleshed out with sets and everything

The tricky part was the distribution algorithm. When you have an odd number of exercises and multiple muscle groups, you need to handle the remainder fairly. I used a base allocation approach - each muscle gets a baseline number of exercises, and the remaining slots go to the first few muscles in the list.

## Tech Stack

**Deno** - Went with Deno instead of Node because it handles permissions better and doesn't have the npm baggage. Felt cleaner for a project like this.

**SQLite** - The exercise database needed proper normalization. I have ~4000 exercises mapped to multiple equipment types via a junction table. SQLite's referential integrity (especially CASCADE deletes) prevented a lot of headaches.

**Server-side rendering with Bootstrap** - No need for a heavy frontend framework here. The app isn't interactive enough to justify React. Server-side rendering keeps it simple and fast.

**Native Web Crypto API** - For password hashing, I used the native crypto API instead of reaching for a library. Implemented PBKDF2 with SHA-256 and 5000 iterations. Made me understand *why* password hashing is designed the way it is.

## Code Structure

/controllers - handles requests, runs the algorithm, validates input
/models - talks to the database (SQLite prepared statements)
/views - generates the HTML that users see
/tools - utility stuff like auth, hashing, session management
/schema - validation rules for user input


I used MVC because it's clean. Business logic stays separate from database access, which stays separate from what the user sees. Makes it easier to test and change things later.

## Security Stuff

Session-based authentication - user logs in, gets a session ID in a cookie. The server validates it on every request.

Password hashing with PBKDF2 - passwords go through 5000 iterations of hashing with a salt. Not storing plaintext obviously, and the iterations slow down anyone trying to brute force.

Prepared statements - all database queries use parameterized statements to prevent SQL injection.

## Running It

You need Deno installed. Then:

```bash
git clone https://github.com/jstateri/Final-Project.git
cd Final-Project

# Create a .env file with a secret key
echo 'SECRET_KEY="some-random-string-here"' > .env

# Set up the database
deno run --allow-read --allow-write tasks/db-init.js

# Start the server
deno run --allow-net --allow-read --allow-env main.js

# Go to http://localhost:8000
```

## What Was Actually Hard

**The exercise distribution**: Getting the algorithm right was harder than it sounds. You want fairness (each muscle gets roughly equal volume) but also flexibility (if there's only one quad exercise available, you can't pretend there are three). I ended up separating concerns - filter exercises by equipment first, then allocate based on what's actually available.

**Avoiding duplicate exercises in a session**: I solved this by removing exercises from the pool as they get selected. Not the most elegant solution but it works - no repeats per session, variety is guaranteed.

**Database normalization**: Setting up the junction table for exercises and equipment took some thought. You need proper foreign keys and cascade deletes or you end up with orphaned records everywhere.

**Auth without a library**: I could have used a third-party service, but wanted to understand how it actually works. Taught me why you probably *should* use established libraries in production - there's a lot to think about.

## What I'd Do Differently

If I built this again, I'd add:

- Progress tracking so users can log their workouts and see what they actually did
- Some kind of feedback loop so the app learns which exercises a user actually completes
- Video links for exercises so people don't have to guess what "landmine rotation" means
- API layer if someone wants to build a mobile app on top
- Caching for exercise queries since that data doesn't change

Also, first version generated perfect routines but assumed everyone had access to whatever exercises existed. The real lesson was learning to fail gracefully - if someone only has resistance bands, the app needs to handle that without crashing.

## Links

[GitHub Repo](https://github.com/jstateri/Final-Project)
