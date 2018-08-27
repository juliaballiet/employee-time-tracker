# employee-time-tracker

CREATE TABLE "employees" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "clockin_id" INT NOT NULL,
    "clocked_in" BOOLEAN DEFAULT FALSE NOT NULL,
    "active" BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE "timeclock" (
    "id" SERIAL PRIMARY KEY,
    "employee_id" INT REFERENCES "employees" NOT NULL,
    "date" DATE DEFAULT CURRENT_DATE NOT NULL,
    "clockin_time" TIME DEFAULT CURRENT_TIME NOT NULL,
    "clockout_time" TIME DEFAULT NULL
);