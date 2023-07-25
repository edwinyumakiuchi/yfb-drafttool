const { hashtagAPI } = require('./ScriptAPIUtils');

// Function to scrape the webpage and store data using the MongoDB API
async function scrapeAndStoreData() {
  const projectionData = await hashtagAPI("projections");
  const auctionData = await hashtagAPI("auction-values");
}

// Call the function to scrape and store data
scrapeAndStoreData();
