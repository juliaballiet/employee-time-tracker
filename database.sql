CREATE TABLE "employees" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,
    "clockin_code" INT NOT NULL,
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

INSERT INTO "employees" ("first_name", "last_name", "clockin_id")
VALUES ('Scott', 'Balliet', 3267), ('Julia', 'Balliet', 5049), ('Angie', 'Balliet', 5799), ('Paul', 'Balliet', 7790), ('Paula', 'Balliet', 1712);

INSERT INTO "timeclock" ("employee_id", "date", "clockin_time", "clockout_time")
VALUES (1, '2018-08-06', '08:00:00', '19:00:00'), (1, '2018-08-07', '08:00:00', '19:00:00'),
(1, '2018-08-08', '08:00:00', '19:00:00'), (1, '2018-08-09', '08:00:00', '19:00:00'), (1, '2018-08-13', '08:00:00', '19:00:00'),
(1, '2018-08-14', '08:00:00', '19:00:00'), (1, '2018-08-15', '08:00:00', '19:00:00'), (1, '2018-08-16', '08:00:00', '19:00:00'),
(2, '2018-08-06', '08:00:00', '19:00:00'), (2, '2018-08-07', '08:00:00', '16:00:00'), (2, '2018-08-08', '08:00:00', '19:00:00'),
(2, '2018-08-09', '08:00:00', '16:00:00'), (2, '2018-08-13', '08:00:00', '16:00:00'), (2, '2018-08-14', '08:00:00', '12:00:00'),
(2, '2018-08-15', '08:00:00', '19:00:00'), (3, '2018-08-06', '08:00:00', '19:00:00'), (3, '2018-08-07', '09:00:00', '19:00:00'),
(3, '2018-08-08', '09:00:00', '19:00:00'), (3, '2018-08-09', '08:30:00', '19:00:00'), (3, '2018-08-13', '08:00:00', '16:00:00'),
(3, '2018-08-14', '08:00:00', '19:00:00'), (3, '2018-08-15', '08:00:00', '19:00:00'), (4, '2018-08-16', '08:00:00', '19:00:00'),
(4, '2018-08-06', '08:00:00', '19:00:00'), (4, '2018-08-07', '08:00:00', '16:00:00'), (4, '2018-08-08', '08:00:00', '19:00:00'),
(4, '2018-08-09', '08:00:00', '16:00:00'), (4, '2018-08-13', '08:00:00', '16:00:00'), (4, '2018-08-14', '08:00:00', '12:00:00'),
(4, '2018-08-15', '08:00:00', '19:00:00'), (5, '2018-08-16', '08:00:00', '19:00:00'),
(5, '2018-08-06', '08:00:00', '19:00:00'), (5, '2018-08-07', '08:00:00', '16:00:00'), (5, '2018-08-08', '08:00:00', '19:00:00'),
(5, '2018-08-09', '08:00:00', '16:00:00'), (5, '2018-08-13', '08:00:00', '16:00:00'), (5, '2018-08-14', '08:00:00', '12:00:00');