// requires
const express = require('express');
const router = express.Router();
const pool = require('../pool');

// routes
router.get('/', (req, res) => {
    console.log('/employees GET route hit');
    const queryText = `SELECT * FROM "employees";`;
    pool.query(queryText).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.get('/:code', (req, res) => {
    console.log('/code GET route hit');
    clockInCode = req.params.code;
    const query = `SELECT * FROM "employees" WHERE "clockin_code" = $1;`;
    pool.query(query, [clockInCode]).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
    console.log('/employees POST route hit with: ', req.body);
    const newEmployee = req.body;
    const queryText = `INSERT INTO "employees" ("first_name", "last_name", "clockin_code")
                    VALUES ($1, $2, $3);`;
    pool.query(queryText, [newEmployee.first_name, newEmployee.last_name, newEmployee.clockin_code])
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
    const queryText = `UPDATE "employees" SET "active" = $1
                    WHERE "id" = $2;`;
    pool.query(queryText, [employeeToChangeStatus, employeeToChangeId]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log('/id PUT route hit with: ', req.params.id);
    const clockInId = req.params.id;
    const queryText = `UPDATE "employees" SET "clocked_in" = NOT "clocked_in" WHERE "id" = $1;`;
    pool.query(queryText, [clockInId]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error: ', error);
        res.sendStatus(500);
    })
})

router.put('/', (req, res) => {
    console.log('/employees PUT hit with: ', req.body);
    const editedEmployee = req.body;
    const queryText = `UPDATE "employees" 
                    SET "first_name" = $1,
                    "last_name" = $2,
                    "clockin_code" = $3
                    WHERE "id" = $4;`;
    pool.query(queryText, [editedEmployee.first_name, editedEmployee.last_name, 
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