const express = require('express'); 
const app = express(); 
const scraperController = require('./scraper');
const bodyParser = require('body-parser');

app.use((bodyParser.json()))
app.use(express.static(__dirname + '/dist'));
app.post('/options', scraperController.getData);


app.listen(8000);


module.exports = app;