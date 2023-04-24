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

//GET '/resource/findByTagThroughWebscraping/:tag'
const findResourcesByTagThroughWebscraping = async (req, res, next) => {
  let tagToSearch = req.params.tag; // will filter using the tags
  let searchTerm = 'introduction to ';
  if(tagToSearch == 'Limit') {
    tagToSearch = 'Limits';
  }
  if(tagToSearch == 'Vector_Functions'){
    tagToSearch = 'Vector Functions';
  }
  if(tagToSearch == 'Parametric_Equations'){
    tagToSearch = 'Parametric Equations';
  }
  searchTerm += tagToSearch;
  searchTerm += ' in calculus for beginners'
  console.log(searchTerm);
  const result = await customsearch.cse.list({
    auth: 'AIzaSyA2wIoZU7sdNoPRgPHt3b62TwX1aixZI4I',
    cx: '31a4cf3e6f4b741a6',
    q: `${searchTerm} -site:www.collegeofthedesert.edu -site:math.utahtech.edu`,
    num: 10,
    siteSearch: 'edu',
    fileType: 'pdf,html',
    excludeTerms: 'syllabus|schedule|catalog|unix|people|course|certificate|digitalcommons'
  });

  const urls = []

  for (const item of result.data.items) {
    try {
      const response = await fetch(item.link);
      const content = await response.text();
      if (!content.toLowerCase().includes('syllabus') || !content.match(/department/i)|| !content.match(/acedemic/i)) {
        urls.push(item.link);
      }
    } catch (e) {
      console.log(`Error occurred while requesting ${item.link}: ${e}`);
      continue;
    }
  }

  // const urls = result.data.items.map(item => item.link);
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
    maxResults: 10
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
    const slicedData1 = data1.slice(0, 5);
    const slicedData2 = data2.slice(0, 5);

    // Combine the results
    const combinedData = slicedData1.concat(slicedData2);
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
    findResourcesByTagThroughWebscraping,
    findVideoResources,
    findAllResources
};