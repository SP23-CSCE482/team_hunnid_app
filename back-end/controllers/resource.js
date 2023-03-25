//import hunnid model
const Resource = require('../models/resource');

const request = require('request');
const cheerio = require('cheerio');

const { google } = require('googleapis');
const port = process.env.PORT || 3001;
const customsearch = google.customsearch('v1');

// Set up the client object
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyCPNBZ6MxWo1jUxtu2DVKtNIKujZZsYhWM'
});

//GET '/resource/findByTag/:tag'
const findResourcesByTag = (req, res, next) => {
  console.log('Calling findResourcesByTag')
    // let tagToSearch = req.params.tag; // will filter using the tags 
    // Resource.find({ tags: tagToSearch }, (err, data) => {
    //     if (err || !data) {
    //         return res.json({ Error: err });
    //     }
    //     return res.json(data);
    // })
};

// //GET '/resource/findByTagThroughWebscraping/:tag'
// const findResourcesByTagThroughWebscraping = (req, res, next) => {
//   let tagToSearch = req.params.tag; // will filter using the tags
//   let searchTerm = 'calculus ';
//   searchTerm += tagToSearch;
//   console.log(searchTerm);
//   const url = 'https://www.google.com/search?q=' + searchTerm;
//   let scrapedUrls = []
//   request(url, (error, response, html) => {
//       if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);
//         $('a').each((i, link) => {
//           const href = link.attribs.href;
//           if (href !== undefined && href.startsWith('/url?q=')) {
//             const url = href.replace('/url?q=', '').split('&')[0];
//             console.log(url + '\n');
//             scrapedUrls.push(url);
//           }
//         });
//         const uniquescrapedUrls = Array.from(new Set(scrapedUrls)).slice(0,5)  
//         res.json(uniquescrapedUrls);
//       } else {
//         console.error('Failed to fetch the web page: ', error);
//         res.json({ Error: error });
//       }
//     }); 
// };

//GET '/resource/findByTagThroughWebscraping/:tag'
const findResourcesByTagThroughWebscraping = async (req, res, next) => {
  let tagToSearch = req.params.tag; // will filter using the tags
  let searchTerm = 'introduction to calculus for beginners ';
  searchTerm += tagToSearch;
  console.log(searchTerm);
  const result = await customsearch.cse.list({
    auth: 'AIzaSyA2wIoZU7sdNoPRgPHt3b62TwX1aixZI4I',
    cx: '31a4cf3e6f4b741a6',
    q: searchTerm,
    num: 10,
    siteSearch: 'edu',
    fileType: 'pdf,html'
  });
  
  const urls = result.data.items.map(item => item.link);
  res.json(urls);
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

//GET '/resource/findAllResources/:tag'
async function findAllResources(req, res) {
  try {
    // First API call
    const result1 = await fetch('http://localhost:'+port+'/resource/findByTagThroughWebscraping/' + req.params.tag);
    if (!result1.ok) {
      throw new Error('API call 1 failed');
    }
    const data1 = await result1.json();
    console.log('Data from API call 1:', data1);

    // Second API call
    const result2 = await fetch('http://localhost:'+port+'/resource/findVideoResources/' + req.params.tag);
    if (!result2.ok) {
      throw new Error('API call 2 failed');
    }
    const data2 = await result2.json();
    console.log('Data from API call 2:', data2[0,2]);
    // Process the results
    const combinedData =data1.concat(data2);
    console.log('Combined Data is: '+combinedData)
    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}





//export controller functions CRUD Default
module.exports = {
    //get
    findResourcesByTag,
    findResourcesByTagThroughWebscraping,
    findVideoResources,
    findAllResources
};