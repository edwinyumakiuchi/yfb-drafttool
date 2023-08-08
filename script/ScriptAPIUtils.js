const fetch = require('node-fetch');
const cheerio = require('cheerio');
const secretConfigs = require('./../src/configs/SecretConfigs.js');

// Define the MongoDB API endpoint and API key
const API_ENDPOINT = 'https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/';
const API_DELETEMANY_ENDPOINT = 'deleteMany';
const API_INSERTONE_ENDPOINT = 'insertOne';
const API_KEY = secretConfigs.mongoKey;

async function hashtagAPI(hashtagPage) {
  try {
    const response = await fetch('https://hashtagbasketball.com/fantasy-basketball-' + hashtagPage);
    const html = await response.text();
    const $ = cheerio.load(html);

    const fetchedPlayers = [];

    $('#ContentPlaceHolder1_GridView1 tr:has(td)').each((index, element) => {
      const playerNameElement = $(element).find('a');
      playerName = playerNameElement.text().trim();

      if (!playerName) {
        return;
      } else {
        playerName = convertPlayerName(playerName);
      }

      let playerData = {};

      $(element).find('td').each((index, tdElement) => {
        const tdValue = $(tdElement).text().trim();
        const tdClass = $(tdElement).attr('class');

        switch (index) {
          case 7:
            if (hashtagPage === "projections") {
              playerData[17] = tdValue
              const matchFGResult = playerData[17].match(/\((.*?)\)/);
              [playerData[18], playerData[19]] = matchFGResult[1].split('/').map(value => value.trim());
              playerData[17] = playerData[17].trim().split('\n')[0];
              playerData[20] = tdClass
              playerData[21] = (playerData[19] * playerData[17]).toFixed(3)
            }
            break;
          case 8:
            if (hashtagPage === "projections") {
              playerData[22] = tdValue
              const matchFTResult = playerData[22].match(/\((.*?)\)/);
              [playerData[23], playerData[24]] = matchFTResult[1].split('/').map(value => value.trim());
              playerData[22] = playerData[22].trim().split('\n')[0];
              playerData[25] = tdClass
              playerData[26] = (playerData[24] * playerData[22]).toFixed(3)
            } else {
              playerData[index] = tdValue
            }
            break;
          default:
            playerData[index] = tdValue
            break;
        }
      });

      // Common player properties
      const commonPlayerProps = {
        name: playerName,
        rank: playerData[0],
        minutesPerGame: playerData[5],
      };

      if (hashtagPage === "projections") {
        // Player properties for "projections" page
        const projectionsProps = {
          adp: playerData[1],
          position: playerData[3],
          team: playerData[4],
          gp: playerData[5],
          fieldGoal: playerData[17],
          fieldGoalMadeOriginal: playerData[18],
          fieldGoalMadeCalculated: playerData[21],
          fieldGoalAttempt: playerData[19],
          fieldGoalClass: playerData[20],
          freeThrow: playerData[22],
          freeThrowMadeOriginal: playerData[23],
          freeThrowMadeCalculated: playerData[26],
          freeThrowAttempt: playerData[24],
          freeThrowClass: playerData[25],
          threePointMade: playerData[9],
          points: playerData[10],
          totalRebounds: playerData[11],
          assists: playerData[12],
          steals: playerData[13],
          blocks: playerData[14],
          turnovers: playerData[15],
          total: playerData[16],
        };
        fetchedPlayers.push({ ...commonPlayerProps, ...projectionsProps });
      } else {
        // Player properties for "auction-values" page
        const otherProps = {
          position: playerData[2],
          team: playerData[3],
          gp: playerData[4],
          yahooAvg: playerData[8],
        };
        fetchedPlayers.push({ ...commonPlayerProps, ...otherProps });
      }
    });

    // Delete all documents in the collection to store fresh data
    const deleteManyResponse = await fetch(API_ENDPOINT + API_DELETEMANY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        dataSource: 'Cluster0',
        database: 'sample-nba',
        collection: hashtagPage,
        filter: {},
      }),
    });

    if (deleteManyResponse.ok) {
      console.log('Collection ' + hashtagPage + ': All documents deleted successfully!');
    } else {
      console.error('Collection ' + hashtagPage + ': Error deleting documents');
    }

    // Store the scraped data
    for (const player of fetchedPlayers) {
      const commonProps = {
        name: player.name,
        rank: player.rank,
        position: player.position,
        team: player.team,
        gp: player.gp,
      };

      const dataDocument = {
        ...commonProps,
        ...(hashtagPage === "projections"
          ? {
              adp: player.adp,
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
            }
          : {
              yahooAvg: player.yahooAvg
            }),
      };

      const insertOneResponse = await fetch(API_ENDPOINT + API_INSERTONE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'sample-nba',
          collection: hashtagPage,
          document: dataDocument,
        }),
      });

      if (insertOneResponse.ok) {
        console.log('Collection ' + hashtagPage + ': Player ' + player.name + ' stored successfully!');
      } else {
        console.error('Collection ' + hashtagPage + ': Error storing player ' + player.name);
      }
    }
    console.log('Collection ' + hashtagPage + ': Data scraped and stored successfully!');
  } catch (error) {
    console.error('Collection ' + hashtagPage + ': Error scraping - ', error);
  }
}

function convertPlayerName(name) {
  const hardcodedNames = {
    "PJ Washington": "P.J. Washington",
    "Robert Williams": "Robert Williams III"
  };

  if (hardcodedNames.hasOwnProperty(name)) {
    return hardcodedNames[name];
  }

  return name;
}

module.exports = { hashtagAPI };