// requires
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// routes
router.post('/', (req, res) => {
    console.log('/timeclock POST route hit with: ', req.body);
    const startDate = req.body.start;
    const endDate = req.body.end;
    console.log(startDate, endDate);
    const queryText = `SELECT "timeclock".*, "employees"."first_name", 
                        "employees"."last_name", EXTRACT('minute' 
                        FROM "timeclock"."clockout_time" - "timeclock"."clockin_time")
                        AS "hours" 
                        FROM "timeclock"
                        JOIN "employees" 
                        ON "employees"."id" = "timeclock"."employee_id"
                        WHERE "date" BETWEEN $1 AND $2`;
    pool.query(queryText, [startDate, endDate]).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.post('/:id', (req, res) => {
    console.log('/timeclock POST route hit with: ', req.params.id);
    const employeesId = req.params.id;
    const queryText = `INSERT INTO "timeclock" ("employee_id")
                    VALUES ($1);`;
    pool.query(queryText, [employeesId]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.put('/', (req, res) => {
    console.log('/timeclock PUT route hit with: ', req.body);
    const editedEntry = req.body;
    const queryText = `UPDATE "timeclock"
                        SET "date" = $1,
                        "clockin_time" = $2,
                        "clockout_time" = $3
                        WHERE "id" = $4;`;
    pool.query(queryText, [editedEntry.date, editedEntry.clockin_time,
    editedEntry.clockout_time, editedEntry.id])
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log('/timeclock PUT route hit with: ', req.params.id);
    const employeesId = req.params.id;
    const queryText = `UPDATE "timeclock"
                        SET "clockout_time" = CURRENT_TIME
                        WHERE "employee_id" = $1`
    pool.query(queryText, [employeesId]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
    console.log('/timeclock DELETE route hit with: ', req.params.id);
    const entryToDeleteId = req.params.id;
    const queryText = `DELETE FROM "timeclock" WHERE "id" = $1;`;
    pool.query(queryText, [entryToDeleteId]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

// exports
module.exports = router;