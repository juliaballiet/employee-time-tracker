// requires
const express = require('express');
const app = express();
const port = process.env.PORT || 5002;
const bodyParser = require('body-parser');

// uses
app.use(express.static('server/public'));
app.use(bodyParser.json());

// spin up server
app.listen(port, () => {
    console.log('the server is up on: ', port);
})