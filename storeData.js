const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Define the MongoDB API endpoint and API key
const API_ENDPOINT = 'https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/insertOne';
const API_KEY = 'abc';

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
      console.log(`playerName: ${playerName}`);

        if (!playerName) {
          return; // Skip to the next iteration if playerName is falsy
        }

      let playerRank = 0, playerADP = 0, playerPos = 0, playerTeam = 0, playerGP = 0, playerMPG = 0, playerFG = 0, playerFGM = 0, playerFGA = 0,
        playerFT = 0, playerFTM = 0, playerFTA = 0, playerTPM = 0, playerPTS = 0, playerTREB = 0, playerAST = 0, playerSTL = 0, playerBLK = 0, playerTO = 0, playerTotal = 0

        $(element).find('td').each((index, tdElement) => {
          const tdValue = $(tdElement).text().trim();
          // console.log(`index: ${index}, tdElement: ${tdElement}, tdValue: ${tdValue}`);

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
              console.log(`playerFG: ${playerFG}`);
              const matchFGResult = playerFG.match(/\((.*?)\)/);
              [playerFGM, playerFGA] = matchFGResult[1].split('/').map(value => value.trim());
              playerFG = playerFG.trim().split('\n')[0];
              console.log(`playerFG: ${playerFG}`);
              console.log(`playerFGM: ${playerFGM}`);
              console.log(`playerFGA: ${playerFGA}`);
              break;
            case 8:
              playerFT = tdValue
              console.log(`playerFT: ${playerFT}`);
              const matchFTResult = playerFT.match(/\((.*?)\)/);
              [playerFTM, playerFTA] = matchFTResult[1].split('/').map(value => value.trim());
              playerFT = playerFT.trim().split('\n')[0];
              console.log(`playerFT: ${playerFT}`);
              console.log(`playerFTM: ${playerFTM}`);
              console.log(`playerFTA: ${playerFTA}`);
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
            default:
              // Code to be executed when none of the cases match the expression
              // console.log(`None of the cases match the switch expression!`);
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
        fieldGoalMade: playerFGM,
        fieldGoalAttempt: playerFGA,
        freeThrow: playerFT,
        freeThrowMade: playerFTM,
        freeThrowAttempt: playerFTA,
        threePointMade: playerTPM,
        points: playerPTS,
        totalRebounds: playerTREB,
        assists: playerAST,
        steals: playerSTL,
        blocks: playerBLK,
        turnovers: playerTO,
        total: playerTotal});
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
          document: {
            name: player.name,
            rank: player.rank,
            adp: player.adp,
            position: player.position,
            team: player.team,
            gp: player.gp,
            minutesPerGame: player.minutesPerGame,
            fieldGoal: player.fieldGoal,
            fieldGoalMade: player.fieldGoalMade,
            fieldGoalAttempt: player.fieldGoalAttempt,
            freeThrow: player.freeThrow,
            freeThrowMade: player.freeThrowMade,
            freeThrowAttempt: player.freeThrowAttempt,
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
