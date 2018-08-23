// requires
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// routes
router.get('/', (req, res) => {
    console.log('/employees GET route hit');
    const query = `SELECT * FROM "employees";`;
    pool.query(query).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log('/employees POST route hit with: ', req.body);
    const newEmployee = req.body;
    const query = `INSERT INTO "employees" ("first_name", "last_name", "clockin_code")
                    VALUES ($1, $2, $3);`;
    pool.query(query, [newEmployee.firstName, newEmployee.lastName, newEmployee.clockInCode])
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.put('/status/:id/:active', (req, res) => {
    console.log('/status PUT hit with: ', req.params.id, req.params.active);
    const employeeToChangeId = req.params.id;
    const employeeToChangeStatus = req.params.active;
    const query = `UPDATE "employees" SET "active" = $1
                    WHERE "id" = $2;`;
    pool.query(query, [employeeToChangeStatus, employeeToChangeId]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

// exports
module.exports = router;