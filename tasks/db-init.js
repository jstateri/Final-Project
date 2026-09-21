import { db } from "../tools/db.js";

db.exec(`
    DROP TABLE IF EXISTS routine_order;
    DROP TABLE IF EXISTS routine;
    DROP TABLE IF EXISTS exercise_equipment;

    DROP TABLE IF EXISTS equipment;

    DROP TABLE IF EXISTS exercise;
    DROP TABLE IF EXISTS sessions;
    DROP TABLE IF EXISTS users;

    CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        hashedPassword TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
    );


    CREATE TABLE IF NOT EXISTS equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS exercise (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        target_muscle TEXT NOT NULL,
        secondary_muscle TEXT
    );

    CREATE TABLE IF NOT EXISTS exercise_equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        equipment_id INTEGER,
        exercise_id INTEGER,
        FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,
        FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS routine (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        day_number INTEGER,
        label TEXT,
        FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS routine_order (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        routine_id INTEGER,
        exerequip_id INTEGER,
        sets INTEGER NOT NULL,
        FOREIGN KEY (exerequip_id) REFERENCES exercise(id) ON DELETE CASCADE,
        FOREIGN KEY (routine_id) REFERENCES routine(id) ON DELETE CASCADE
    );

`);

console.log("Database initialized successfully!");

db.exec(`
    INSERT INTO equipment (id, name)
        VALUES
        (1, 'none'),
        (2, 'dumbbells'),
        (3, 'machine');

    INSERT INTO exercise (id, name, target_muscle, secondary_muscle)
        VALUES
        (1, 'Pushup', 'Chest', 'Triceps'),
        (2, 'Squat', 'Quads', 'Glutes'),
        (3, 'Lunges', 'Quads', ''),
        (4, 'Calf raise', 'Calves', ''),
        (5, 'Dips', 'Triceps', 'Shoulders'),
        (6, 'Pullups', 'Back', 'Biceps'),
        (7, 'Crunch', 'Abs', ''),

        (8, 'Row', 'Back', 'Biceps'),
        (9, 'Bicep curl', 'Biceps', ''),
        (10, 'Lateral raise', 'Shoulders', ''),
        (11, 'Shoulder press', 'Shoulders', 'Triceps'),
        (12, 'Bench press', 'Chest', 'Triceps'),
        (13, 'Tricep extension', 'Triceps', ''),

        (14, 'Leg press', 'Quads', 'Glutes'),
        (15, 'Lat pulldown', 'Back', 'Biceps'),
		
		(16, 'Inverted Row', 'Back', 'Biceps'),
        (17, 'Superman', 'Back', ''),
        (18, 'Reverse Snow Angel', 'Back', ''),
        (19, 'Plank Row', 'Back', 'Abs'),
        (20, 'Back Extension', 'Back', 'Glutes'),
        (30, 'Isometric Towel Curl', 'Biceps', ''),
        (31, 'Doorway Curl', 'Biceps', ''),
        (32, 'Underhand Inverted Row', 'Biceps', 'Back'),
        (33, 'Pelican Curl', 'Biceps', ''),
        (34, 'Bicep Pushup', 'Biceps', 'Chest'),
        (35, 'Chin-up', 'Biceps', 'Back'),
        (46, 'Wide Pushup', 'Chest', 'Shoulders'),
        (47, 'Diamond Pushup', 'Chest', 'Triceps'),
        (48, 'Decline Pushup', 'Chest', 'Shoulders'),
        (55, 'Pike Pushup', 'Shoulders', 'Triceps'),
        (56, 'Handstand Pushup', 'Shoulders', 'Triceps'),
        (57, 'Bear Crawl', 'Shoulders', 'Abs'),
        (58, 'Wall Walk', 'Shoulders', 'Abs'),
        (63, 'Close Grip Pushup', 'Triceps', 'Chest'),
        (64, 'Bench Dip', 'Triceps', 'Chest'),
        (65, 'Tricep Bow', 'Triceps', ''),
        (71, 'Jump Squat', 'Quads', 'Calves'),
        (72, 'Bulgarian Split Squat', 'Quads', 'Glutes'),
        (77, 'Single Leg Calf Raise', 'Calves', ''),
        (78, 'Jump Rope', 'Calves', ''),
        (79, 'Donkey Calf Raise', 'Calves', ''),
        (86, 'Plank', 'Abs', ''),
        (87, 'Leg Raise', 'Abs', ''),
        (88, 'Bicycle Crunch', 'Abs', ''),
		
		(21, 'DB Pullover', 'Back', 'Chest'),
        (22, 'DB Deadlift', 'Back', 'Quads'),
        (23, 'Renegade Row', 'Back', 'Abs'),
        (24, 'Single Arm DB Row', 'Back', 'Biceps'),
        (25, 'Chest Supported Row', 'Back', 'Biceps'),
        (36, 'Hammer Curl', 'Biceps', ''),
        (37, 'Concentration Curl', 'Biceps', ''),
        (38, 'Incline DB Curl', 'Biceps', ''),
        (39, 'Zottman Curl', 'Biceps', ''),
        (40, 'Cross Body Curl', 'Biceps', ''),
        (49, 'DB Fly', 'Chest', ''),
        (50, 'Incline DB Press', 'Chest', 'Triceps'),
        (51, 'Decline DB Press', 'Chest', 'Triceps'),
        (59, 'Front Raise', 'Shoulders', ''),
        (60, 'Arnold Press', 'Shoulders', 'Triceps'),
        (66, 'Overhead DB Ext', 'Triceps', ''),
        (67, 'DB Kickback', 'Triceps', ''),
        (68, 'Skullcrusher', 'Triceps', ''),
        (73, 'Goblet Squat', 'Quads', 'Glutes'),
        (74, 'DB Step-Up', 'Quads', 'Glutes'),
        (80, 'Seated DB Calf Raise', 'Calves', ''),
        (81, 'DB Toe Walk', 'Calves', ''),
        (82, 'DB Jump', 'Calves', ''),
        (89, 'DB Russian Twist', 'Abs', ''),
        (90, 'Weighted Crunch', 'Abs', ''),
        (91, 'DB Side Bend', 'Abs', ''),
		
		(26, 'Seated Cable Row', 'Back', 'Biceps'),
        (27, 'Straight Arm Pulldown', 'Back', ''),
        (28, 'T-Bar Row Machine', 'Back', 'Biceps'),
        (29, 'Cable Face Pull', 'Back', 'Shoulders'),
        (41, 'Cable Curl', 'Biceps', ''),
        (42, 'Preacher Machine Curl', 'Biceps', ''),
        (43, 'High Cable Curl', 'Biceps', ''),
        (44, 'Reverse Cable Curl', 'Biceps', ''),
        (45, 'Rope Hammer Curl', 'Biceps', ''),
        (52, 'Pec Deck Fly', 'Chest', ''),
        (53, 'Cable Crossover', 'Chest', ''),
        (54, 'Incline Machine Press', 'Chest', 'Triceps'),
        (61, 'Machine Reverse Fly', 'Shoulders', 'Back'),
        (62, 'Cable Upright Row', 'Shoulders', 'Biceps'),
        (69, 'Cable Pushdown', 'Triceps', ''),
        (70, 'Overhead Cable Ext', 'Triceps', ''),
        (75, 'Leg Extension', 'Quads', ''),
        (76, 'Hack Squat', 'Quads', 'Glutes'),
        (83, 'Seated Calf Machine', 'Calves', ''),
        (84, 'Leg Press Calf Raise', 'Calves', ''),
        (85, 'Standing Calf Machine', 'Calves', ''),
        (92, 'Cable Crunch', 'Abs', ''),
        (93, 'Machine Crunch', 'Abs', ''),
        (94, 'Captains Chair', 'Abs', '');

    INSERT INTO exercise_equipment (exercise_id, equipment_id)
        VALUES
        --none
        (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), 
		(16, 1), (17, 1), (18, 1), (19, 1), (20, 1), 
        (30, 1), (31, 1), (32, 1), (33, 1), (34, 1), (35, 1), 
        (46, 1), (47, 1), (48, 1), 
        (55, 1), (56, 1), (57, 1), (58, 1), 
        (63, 1), (64, 1), (65, 1), 
        (71, 1), (72, 1), 
        (77, 1), (78, 1), (79, 1), 
        (86, 1), (87, 1), (88, 1),

        --db
        (8, 2), (9, 2), (10, 2), (11, 2), (12, 2), (13, 2), (2, 2), (3, 2), (4, 2), (7, 2),
		(21, 2), (22, 2), (23, 2), (24, 2), (25, 2), 
        (36, 2), (37, 2), (38, 2), (39, 2), (40, 2), 
        (49, 2), (50, 2), (51, 2), 
        (59, 2), (60, 2), 
        (66, 2), (67, 2), (68, 2), 
        (73, 2), (74, 2), (72, 2), 
        (80, 2), (81, 2), (82, 2), 
        (89, 2), (90, 2), (91, 2),

        --machine
        (14, 3), (15,3), (2, 3), (4, 3), (5, 3), (7, 3), (8, 3), (9, 3), (10, 3), (11, 3), (12, 3), (13, 3),
		(26, 3), (27, 3), (28, 3), (29, 3), 
        (41, 3), (42, 3), (43, 3), (44, 3), (45, 3), 
        (52, 3), (53, 3), (54, 3), 
        (61, 3), (62, 3), 
        (69, 3), (70, 3), 
        (75, 3), (76, 3), 
        (83, 3), (84, 3), (85, 3), 
        (92, 3), (93, 3), (94, 3);
    

    INSERT INTO users (username, hashedPassword)
        VALUES
        ('test', '8a314d7fc5fb2369281ad0733cd69d02cafc4c2b804cf03bc4be4ae33617de21');

`);
console.log("Items updated successfully!");