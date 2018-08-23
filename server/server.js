// requires
const express = require('express');
const app = express();
const port = process.env.PORT || 5002;
const bodyParser = require('body-parser');
const employees = require('./modules/routes/employees.route')

// uses
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/employees', employees);

// spin up server
app.listen(port, () => {
    console.log('the server is up on: ', port);
})