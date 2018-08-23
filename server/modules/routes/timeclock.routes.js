// requires
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// routes
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

// exports
module.exports = router;