//import hunnid model
const Resource = require('../models/resource');

const request = require('request');
const cheerio = require('cheerio');

const { google } = require('googleapis');

// Set up the client object
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCPNBZ6MxWo1jUxtu2DVKtNIKujZZsYhWM'
});

//GET '/resource/findByTag/:tag'
const findResourcesByTag = (req, res, next) => {
    let tagToSearch = req.params.tag; // will filter using the tags 
    // Resource.find({ tags: tagToSearch }, (err, data) => {
    //     if (err || !data) {
    //         return res.json({ Error: err });
    //     }
    //     return res.json(data);
    // })
    getRequest('http://localhost:3001/resource/findByTagThroughWebscraping/'+tagToSearch).then(function (body1) {
      // do something with body1
      res = body1
    return getRequest('http://localhost:3001/resource/findByTagThroughWebscraping/:tag'+tagToSearch);
    }).then(function (body2) {
        
        // do something with body2
        return getRequest('http://www.test.com/api3');
    }).then(function (body3) {
        // do something with body3
        //And so on...
    });

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
          const uniquescrapedUrls = Array.from(new Set(scrapedUrls)).slice(0,5)

          mongoResources = findResourcesByTag(req)
          console.log(mongoResources)
          res.json(uniquescrapedUrls)

        } else {
          console.error('Failed to fetch the web page: ', error);
          res.json({ Error: error });
        }
      }); 
};

const findVideoResources = (req, res, next) => {
  let tagToSearch = req.params.tag; // will filter using the tags
  // Define the search query
  let searchQuery = 'calculus ';
  searchQuery += tagToSearch;
  console.log(searchQuery);

  // Make the API request
  youtube.search.list({
    part: 'snippet',
    type: 'video',
    q: searchQuery,
    maxResults: 5
  })
  .then((response) => {
    // Extract the video data from the API response
    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      videoId: item.id.videoId,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));

    // Log the video data to the console
    console.log(`Top ${videos.length} search results for "${searchQuery}":`);
    videos.forEach((video, index) => {
      console.log(`\n#${index + 1}: ${video.title}\nDescription: ${video.description}\nVideo ID: ${video.videoId}\nThumbnail URL: ${video.thumbnailUrl}`);
    });

    const urls = videos.map((video) => ( video.videoUrl ))

    return res.json(urls)
  })
  .catch((error) => {
    console.error(error);
  });
};





//export controller functions CRUD Default
module.exports = {
    //get
    findResourcesByTag,
    findResourcesByTagThroughWebscraping,
    findVideoResources
};