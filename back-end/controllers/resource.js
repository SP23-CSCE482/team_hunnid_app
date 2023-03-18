//import hunnid model
const Resource = require('../models/resource');

const request = require('request');
const cheerio = require('cheerio');

//GET '/resource/findByTag/:tag'
const findResourcesByTag = (req, res, next) => {
    let tagToSearch = req.params.tag; // will filter using the tags 
    Resource.find({ tags: tagToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//GET '/resource/findByTagThroughWebscraping/:tag'
const findResourcesByTagThroughWebscraping = (req, res, next) => {
    let tagToSearch = req.params.tag; // will filter using the tags
    let searchTerm = 'calculus ';
    searchTerm += tagToSearch;
    console.log(searchTerm);
    const url = 'https://www.google.com/search?q=' + searchTerm;
    let scrapedUrls = []
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          $('a').each((i, link) => {
            const href = link.attribs.href;
            if (href !== undefined && href.startsWith('/url?q=')) {
              const url = href.replace('/url?q=', '').split('&')[0];
              console.log(url + '\n');
              scrapedUrls.push(url);
            }
          });
          const uniquescrapedUrls = Array.from(new Set(scrapedUrls))  
          res.json(uniquescrapedUrls);
        } else {
          console.error('Failed to fetch the web page: ', error);
          res.json({ Error: error });
        }
      }); 
};



//export controller functions CRUD Default
module.exports = {
    //get
    findResourcesByTag,
    findResourcesByTagThroughWebscraping
};