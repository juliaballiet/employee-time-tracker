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
    pool.query(query, [newEmployee.first_name, newEmployee.last_name, newEmployee.clockin_code])
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

router.put('/', (req, res) => {
    console.log('/employees PUT hit with: ', req.body);
    const editedEmployee = req.body;
    const query = `UPDATE "employees" 
                    SET "first_name" = $1,
                    "last_name" = $2,
                    "clockin_code" = $3
                    WHERE "id" = $4;`;
    pool.query(query, [editedEmployee.first_name, editedEmployee.last_name, 
                        editedEmployee.clockin_code, editedEmployee.id])
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

// exports
module.exports = router;