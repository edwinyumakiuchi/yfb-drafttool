const { hashtagAPI } = require('./ScriptAPIUtils');

// Function to scrape the webpages and store data
// node ./script/StoreData.js
async function scrapeAndStoreData() {
  const scheduleData = await hashtagAPI("advanced-nba-schedule-grid");
  const projectionData = await hashtagAPI("fantasy-basketball-projections");
  const auctionData = await hashtagAPI("fantasy-basketball-auction-values");
}

scrapeAndStoreData();
