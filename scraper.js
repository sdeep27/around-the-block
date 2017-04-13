const cheerio = require('cheerio');
const request = require('request');
const craigslist = require('node-craigslist');
const fs = require('fs');

const scraperController = {
  getData (req, res) {
    //right now it's sub as category no matter what - need to fix sending of post request
    const cat = req.body.type === 'lease' ? 'apa' : 'sub';
    const min = req.body.min; 
    const max = req.body.max;
    const zip = req.body.zip;
    console.log(cat, min, max, zip);
    const prices = [], titles = [], urls = [], picLinks = [], promiseArray = [];
    const noImgLink = 'https://image.freepik.com/free-icon/house_318-64534.jpg'
    const client = new craigslist.Client({
      baseHost : 'craigslist.org',
      city : 'losangeles'
    });
    //change options based on request
    const options = {
      category: cat,
      minAsk: min,
      maxAsk: max
    }
    //Need To Display something if no results
    client.search(options, zip)
      .then((listings) => {
        listings.forEach((listing) => {
          prices.push(listing.price);
          titles.push(listing.title);
          urls.push(listing.url);
          promiseArray.push(client.details(listing));
        })
        Promise.all(promiseArray).then((details) =>{
          for(let i = 0; i < details.length; i++) {
            if (details[i].images) {
              picLinks.push(details[i].images[0]);
            }
            else {
              picLinks.push(noImgLink);
            }
          }
          listObj = [];
          for (let i = 0; i < titles.length; i++) {
            listObj.push({
              price: prices[i],
              title: titles[i],
              url: urls[i],
              picLink: picLinks[i]
            })
          }
          console.log('final listOBJ: ', listObj);
          res.json(listObj);
        })

      })
      .catch((err) => {
        console.error('err: ', err);
    })
  }
}

module.exports = scraperController;