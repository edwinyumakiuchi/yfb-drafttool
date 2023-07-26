const { hashtagAPI } = require('./ScriptAPIUtils');

// Function to scrape the webpages and store data
async function scrapeAndStoreData() {
  const projectionData = await hashtagAPI("projections");
  const auctionData = await hashtagAPI("auction-values");
}

scrapeAndStoreData();
