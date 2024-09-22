const fetch = require('node-fetch');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const secretConfigs = require('./../src/configs/SecretConfigs.js');
const bidConfigs = require('./../src/configs/BidConfigs.js');

// Define the MongoDB API endpoint and API key
const API_ENDPOINT = 'https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/';
const API_DELETEMANY_ENDPOINT = 'deleteMany';
const API_INSERTONE_ENDPOINT = 'insertOne';
const API_INSERTMANY_ENDPOINT = 'insertMany';
const API_KEY = secretConfigs.mongoKey;

async function hashtagAPI(hashtagPage) {
  let html = ''
  const browser = await puppeteer.launch();
  try {
    if (hashtagPage == "advanced-nba-schedule-grid") {
      const response = await fetch('https://hashtagbasketball.com/' + hashtagPage);
      html = await response.text();
    } else {
      const page = await browser.newPage();

      // Show All
      await page.goto('https://hashtagbasketball.com/' + hashtagPage);
      await page.click('#ContentPlaceHolder1_DDSHOW');
      await page.select('#ContentPlaceHolder1_DDSHOW', '900');
      await page.waitForTimeout(5000);

      // Select source as Yahoo
      await page.click('#ContentPlaceHolder1_DDPOSFROM');
      await page.select('#ContentPlaceHolder1_DDPOSFROM', '1');
      await page.waitForTimeout(5000);

      // Select Minus 1
      await page.click('#ContentPlaceHolder1_DDTYPE');
      await page.select('#ContentPlaceHolder1_DDTYPE', 'M1');
      await page.waitForTimeout(5000);

      // Select Based on: Combined
      await page.click('#ContentPlaceHolder1_DDRANK');
      await page.select('#ContentPlaceHolder1_DDRANK', 'COM');
      await page.waitForTimeout(5000);

      // Select Teams: 10
      if (hashtagPage == "fantasy-basketball-auction-values") {
          await page.click('#ContentPlaceHolder1_DDTEAM');
          await page.select('#ContentPlaceHolder1_DDTEAM', '10');
          await page.waitForTimeout(5000);
      }

      html = await page.content();
    }
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
            if (hashtagPage === "fantasy-basketball-projections") {
              playerData[17] = tdValue
              const matchFGResult = playerData[17].match(/\((.*?)\)/);
              [playerData[18], playerData[19]] = matchFGResult[1].split('/').map(value => value.trim());
              playerData[17] = playerData[17].trim().split('\n')[0];
              playerData[20] = tdClass
              playerData[21] = (playerData[19] * playerData[17]).toFixed(3)
            } else {
              // auction: valued at
              playerData[index] = tdValue
            }
            break;
          case 8:
            if (hashtagPage === "fantasy-basketball-projections") {
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
        rank: extractRank(playerData[0]),
        minutesPerGame: playerData[6],
      };

      if (hashtagPage === "fantasy-basketball-projections") {
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
          valuedAt: playerData[7],
          hbAuctionAvg: (parseFloat(playerData[8].replace('$', '')) + parseFloat(playerData[7].replace('$', ''))) / 2
        };
        fetchedPlayers.push({ ...commonPlayerProps, ...otherProps });
      }
    });

    fetchedPlayers.sort((a, b) => b.hbAuctionAvg - a.hbAuctionAvg);

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayNames = ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'];
    const teamNameAbbreviations = {
      "Atlanta Hawks": "ATL",
      "Boston Celtics": "BOS",
      "Brooklyn Nets": "BKN",
      "Charlotte Hornets": "CHA",
      "Chicago Bulls": "CHI",
      "Cleveland Cavaliers": "CLE",
      "Dallas Mavericks": "DAL",
      "Denver Nuggets": "DEN",
      "Detroit Pistons": "DET",
      "Golden State Warriors": "GSW",
      "Houston Rockets": "HOU",
      "Indiana Pacers": "IND",
      "Los Angeles Clippers": "LAC",
      "Los Angeles Lakers": "LAL",
      "Memphis Grizzlies": "MEM",
      "Miami Heat": "MIA",
      "Milwaukee Bucks": "MIL",
      "Minnesota Timberwolves": "MIN",
      "New Orleans Pelicans": "NOP",
      "New York Knicks": "NYK",
      "Oklahoma City Thunder": "OKC",
      "Orlando Magic": "ORL",
      "Philadelphia 76ers": "PHI",
      "Phoenix Suns": "PHO",
      "Portland Trail Blazers": "POR",
      "Sacramento Kings": "SAC",
      "San Antonio Spurs": "SAS",
      "Toronto Raptors": "TOR",
      "Utah Jazz": "UTA",
      "Washington Wizards": "WAS"
    };

    const scheduleData = {
        data: daysOfWeek.map(day => ({
            date: day,
            teams: [],
            matchups: []
        }))
    };
    const addedMatchups = new Set();

    $('.text-left.mw200').each((index, element) => {
      const teamName = $(element).text().trim();

      if (teamName === "# Games Played") {
        return;
      }

      const teamAbbreviation = teamNameAbbreviations[teamName];

      for (let i = 0; i < dayNames.length; i++) {
        const opp = $(element).nextAll().eq(i + 1).text().trim();

        if (opp) {
          scheduleData.data[i].teams.push(teamAbbreviation);

          const sortedMatchup = [teamAbbreviation, opp.replace('@', '')].sort();
          if (!addedMatchups.has(sortedMatchup.toString())) {
            addedMatchups.add(sortedMatchup.toString());

            if (!opp.includes('@')) {
              scheduleData.data[i].matchups.push(['@' + teamAbbreviation, opp].sort());
            } else {
              scheduleData.data[i].matchups.push([teamAbbreviation, opp].sort());
            }
          }
        }
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
        collection: hashtagPage.replace('fantasy-basketball-', ''),
        filter: {},
      }),
    });

    if (deleteManyResponse.ok) {
      console.log('Collection ' + hashtagPage + ': All documents deleted successfully!');
    } else {
      console.error('Collection ' + hashtagPage + ': Error deleting documents');
    }

    let bidIndex = 0;
    let players = [];

    // Store the scraped data
    for (const player of fetchedPlayers) {
      if (hashtagPage === "advanced-nba-schedule-grid") {
        break;
      }

      let goftBid = bidConfigs[bidIndex];
      goftBid = goftBid !== undefined ? goftBid : 0;

      const commonProps = {
        name: player.name,
        rank: player.rank,
        position: player.position,
        team: player.team,
        gp: player.gp,
      };

      const dataDocument = {
        ...commonProps,
        ...(hashtagPage === "fantasy-basketball-projections"
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
              yahooAvg: player.yahooAvg,
              valuedAt: player.valuedAt,
              hbAuctionAvg: player.hbAuctionAvg,
              goftBid: goftBid
            }),
      };

      console.log("Pushing: " + dataDocument.name)
      players.push(dataDocument);
      bidIndex++
    }

    if (hashtagPage != "advanced-nba-schedule-grid") {
      const insertResponse = await fetch(API_ENDPOINT + API_INSERTMANY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'sample-nba',
          collection: hashtagPage.replace('fantasy-basketball-', ''),
          documents: players,
        }),
      });

      if (insertResponse.ok) {
        console.log('Collection ' + hashtagPage + ': Inserted successfully!');
      } else {
        console.error('Collection ' + hashtagPage + ': Error inserting player');
        console.error('Status Code:', insertResponse.status);
        console.error('Status Text:', insertResponse.statusText);

        // You can also log the response body if needed
        insertResponse.text().then((responseText) => {
          console.error('Response Body:', responseText);
        });
      }
    }

    if (hashtagPage === "advanced-nba-schedule-grid") {
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
          document: scheduleData,
        }),
      });

      if (insertOneResponse.ok) {
        console.log('Collection ' + hashtagPage + ': scheduleData stored successfully!');
      } else {
        console.error('Collection ' + hashtagPage + ': Error storing scheduleData');
      }
    }

    console.log('Collection ' + hashtagPage + ': Data scraped and stored successfully!');
  } catch (error) {
    console.error('Collection ' + hashtagPage + ': Error scraping - ', error);
  } finally {
    await browser.close();
  }
}

function convertPlayerName(name) {
  const hardcodedNames = {
    "P.J. Washington": "P.J. Washington Jr.",
    "Robert Williams": "Robert Williams III",
    "Alperen Sengün": "Alperen Sengun",
    "Nicolas Claxton": "Nic Claxton",
    "Dennis Schröder": "Dennis Schroder",
    "Gregory Jackson": "GG Jackson II",
  };

  if (hardcodedNames.hasOwnProperty(name)) {
    return hardcodedNames[name];
  }

  return name;
}

function extractRank(rank) {
    // Define the regular expression to match a number
    const regex = /^\d+/;

    // Use match to get the first number that matches the regex
    const match = rank.match(regex);

    // If a match is found, return the first number; otherwise, return null
    return match ? match[0] : null;
}

module.exports = { hashtagAPI };