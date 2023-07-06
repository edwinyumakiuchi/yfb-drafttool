const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Define the MongoDB API endpoint and API key
const API_ENDPOINT = 'https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/insertOne';
const API_KEY = 'abcde';

// Function to scrape the webpage and store data using the MongoDB API
async function scrapeAndStoreData() {
  try {
    const response = await fetch('https://hashtagbasketball.com/fantasy-basketball-projections');
    const html = await response.text();
    const $ = cheerio.load(html);

    const fetchedPlayers = [];

    $('#ContentPlaceHolder1_GridView1 tr:has(td)').each((index, element) => {
      const playerNameElement = $(element).find('a');
      const playerName = playerNameElement.text().trim();

      fetchedPlayers.push({ name: playerName });
    });

    // Store the scraped data using the MongoDB API
    for (const player of fetchedPlayers) {
      const apiResponse = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'sample-nba',
          collection: 'projections',
          document: player,
        }),
      });

      if (apiResponse.ok) {
        console.log(`Player ${player.name} stored successfully!`);
      } else {
        console.error(`Error storing player ${player.name}`);
      }
    }

    console.log('Data scraped and stored successfully!');
  } catch (error) {
    console.error('Error scraping and storing data:', error);
  }
}

// Call the function to scrape and store data
scrapeAndStoreData();
