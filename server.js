const express = require('express'); 
const app = express(); //creating a new instance of express
const scraperController = require('./scraper');
const bodyParser = require('body-parser');

// first sample route
app.use((bodyParser.json()))
app.use(express.static(__dirname + '/dist'));
app.post('/options', scraperController.getData);


app.listen(8000);


module.exports = app;