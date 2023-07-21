const secretConfigs = require('./src/configs/SecretConfigs.js');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Define the MongoDB API endpoint and API key
const API_ENDPOINT = 'https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/';
const API_DELETEMANY_ENDPOINT = 'deleteMany';
const API_INSERTONE_ENDPOINT = 'insertOne';
const API_KEY = secretConfigs.mongoKey;

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

      if (!playerName) {
        return; // Skip to the next iteration if playerName is falsy
      }

      let playerRank = 0, playerADP = 0, playerPos = 0, playerTeam = 0, playerGP = 0, playerMPG = 0, playerFG = 0,
        playerFGMO = 0, playerFGMC = 0, playerFGA = 0, playerFGClass = '', playerFT = 0, playerFTMO = 0, playerFTMC = 0,
        playerFTA = 0, playerFTClass = '', playerTPM = 0, playerPTS = 0, playerTREB = 0, playerAST = 0, playerSTL = 0,
        playerBLK = 0, playerTO = 0, playerTotal = 0

      $(element).find('td').each((index, tdElement) => {
        const tdValue = $(tdElement).text().trim();
        const tdClass = $(tdElement).attr('class');

        // TODO: retrieve colorcode class for all categories?
        switch (index) {
          case 0:
            playerRank = tdValue
            break;
          case 1:
            playerADP = tdValue
            break;
          case 3:
            playerPos = tdValue
            break;
          case 4:
            playerTeam = tdValue
            break;
          case 5:
            playerGP = tdValue
            break;
          case 6:
            playerMPG = tdValue
            break;
          case 7:
            playerFG = tdValue
            const matchFGResult = playerFG.match(/\((.*?)\)/);
            [playerFGMO, playerFGA] = matchFGResult[1].split('/').map(value => value.trim());
            playerFG = playerFG.trim().split('\n')[0];
            playerFGClass = tdClass
            playerFGMC = (playerFGA * playerFG).toFixed(3)
            break;
          case 8:
            playerFT = tdValue
            const matchFTResult = playerFT.match(/\((.*?)\)/);
            [playerFTMO, playerFTA] = matchFTResult[1].split('/').map(value => value.trim());
            playerFT = playerFT.trim().split('\n')[0];
            playerFTClass = tdClass
            playerFTMC = (playerFTA * playerFT).toFixed(3)
            break;
          case 9:
            playerTPM = tdValue
            break;
          case 10:
            playerPTS = tdValue
            break;
          case 11:
            playerTREB = tdValue
            break;
          case 12:
            playerAST = tdValue
            break;
          case 13:
            playerSTL = tdValue
            break;
          case 14:
            playerBLK = tdValue
            break;
          case 15:
            playerTO = tdValue
            break;
          case 16:
            playerTotal = tdValue
            break;
        }
      });

      fetchedPlayers.push({ name: playerName,
        rank: playerRank,
        adp: playerADP,
        position: playerPos,
        team: playerTeam,
        gp: playerGP,
        minutesPerGame: playerMPG,
        fieldGoal: playerFG,
        fieldGoalMadeOriginal: playerFGMO,
        fieldGoalMadeCalculated: playerFGMC,
        fieldGoalAttempt: playerFGA,
        fieldGoalClass: playerFGClass,
        freeThrow: playerFT,
        freeThrowMadeOriginal: playerFTMO,
        freeThrowMadeCalculated: playerFTMC,
        freeThrowAttempt: playerFTA,
        freeThrowClass: playerFTClass,
        threePointMade: playerTPM,
        points: playerPTS,
        totalRebounds: playerTREB,
        assists: playerAST,
        steals: playerSTL,
        blocks: playerBLK,
        turnovers: playerTO,
        total: playerTotal});
    });

    // Delete all documents in the collection using the MongoDB API
    const deleteManyResponse = await fetch(API_ENDPOINT + API_DELETEMANY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: 'sample-nba',
        collection: 'projections',
        filter: {},
      }),
    });

    if (deleteManyResponse.ok) {
      console.log('All documents deleted successfully!');
    } else {
      console.error('Error deleting documents');
    }

    // Store the scraped data using the MongoDB API
    for (const player of fetchedPlayers) {
      const insertOneResponse = await fetch(API_ENDPOINT + API_INSERTONE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'sample-nba',
          collection: 'projections',
          document: {
            name: player.name,
            rank: player.rank,
            adp: player.adp,
            position: player.position,
            team: player.team,
            gp: player.gp,
            minutesPerGame: player.minutesPerGame,
            fieldGoal: player.fieldGoal,
            fieldGoalMadeOriginal: player.fieldGoalMadeOriginal,
            fieldGoalMadeCalculated: player.fieldGoalMadeCalculated,
            fieldGoalAttempt: player.fieldGoalAttempt,
            fieldGoalClass: player.fieldGoalClass,
            freeThrow: player.freeThrow,
            freeThrowMadeOriginal: player.freeThrowMadeOriginal,
            freeThrowMadeCalculated: player.freeThrowMadeCalculated,
            freeThrowAttempt: player.freeThrowAttempt,
            freeThrowClass: player.freeThrowClass,
            threePointMade: player.threePointMade,
            points: player.points,
            totalRebounds: player.totalRebounds,
            assists: player.assists,
            steals: player.steals,
            blocks: player.blocks,
            turnovers: player.turnovers,
            total: player.total
          },
        }),
      });

      if (insertOneResponse.ok) {
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