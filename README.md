# Automated Constraint-Based Fitness Routine Generator

A full-stack web application that dynamically generates structured workout routines using a deterministic, rule-based algorithm. This project was developed to solve the hallucination and constraint-ignorance issues common in Generative AI fitness applications.

## Tech Stack
* **Runtime:** Deno
* **Database:** SQLite (@db/sqlite)
* **Frontend:** Server-Side Rendered HTML, Bootstrap 5.3
* **Architecture:** MVC (Model-View-Controller)
* **Security:** Native Web Crypto API

## Engineering Highlights

### Constraint Satisfaction Engine
The core generation algorithm processes user inputs (available time, equipment, days per week) to build a routine that guarantees a 2x weekly muscle training frequency[cite: 34]. 
* Maps training days to specific split configurations (Full Body, Upper/Lower, Push/Pull/Legs)[cite: 7].
* Distributes exercise slots mathematically using base allocations and remainder distribution to ensure all targeted muscles receive adequate volume[cite: 7, 34].
* Applies strict equipment filtering via SQL queries before allocation, preventing invalid exercise assignments[cite: 7, 34].
* Deduplicates selections in memory to guarantee exercise variety within a single session[cite: 7, 34].

### Relational Database Design
The application utilizes a highly normalized SQLite database designed to prevent data duplication and maintain structural integrity[cite: 34].
* Implements a many-to-many junction table (`exercise_equipment`) with surrogate keys to map single exercises to multiple equipment types[cite: 19, 34].
* Enforces referential integrity using `ON DELETE CASCADE` across all foreign keys, preventing orphaned records and state errors[cite: 19, 34].

### Custom Security Implementation
* Session-based authentication implemented via cookies to manage user states[cite: 20].
* Passwords are mathematically hashed using the Web Crypto API, applying PBKDF2, SHA-256, and salt iterations to prevent brute-force vulnerabilities[cite: 22, 34].

## Running Locally

### Prerequisites
* Deno installed on your local machine.

### Setup Instructions

1. Clone the repository and navigate to the project root.
2. Create a `.env` file in the root directory and define your secret key for password hashing:
   `SECRET_KEY="your_secure_string_here"`
3. Initialize and seed the SQLite database:
   `deno run --allow-read --allow-write tools/db-init.js`
4. Start the application server:
   `deno run --allow-net --allow-read --allow-env main.js`
5. Open your web browser and navigate to `http://localhost:8000`

## Project Structure
* `/controllers` - Algorithmic logic, routing handlers, and data validation.
* `/models` - SQLite database interactions, prepared statements, and queries.
* `/views` - Server-side rendered HTML template functions.
* `/tools` - Utility scripts for database initialization, cryptography, and session management.
* `/schema` - Input validation schemas.
