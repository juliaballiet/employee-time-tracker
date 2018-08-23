// requires
const express = require('express');
const app = express();
const port = process.env.PORT || 5002;
const bodyParser = require('body-parser');
const employees = require('./modules/routes/employees.route');
const timeclock = require('./modules/routes/timeclock.routes');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/employees', employees);
app.use('/timeclock', timeclock);

// spin up server
app.listen(port, () => {
    console.log('the server is up on: ', port);
})