const selfRankingConfigs = require('./../configs/SelfRankingConfigs.js');

// Function to assign auctionValue to each player in the players array
export function assignAuctionValues(players, auctionPlayers, avgYahooBids) {
  if (players && auctionPlayers) {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < auctionPlayers.length; j++) {
        if (players[i].name === auctionPlayers[j].name) {
          players[i].auctionValue = parseFloat(auctionPlayers[j].yahooAvg.replace('$', '').replace(/\.?0+$/, ''))
        }
      }
      if (!players[i].auctionValue || isNaN(players[i].auctionValue)) {
        players[i].auctionValue = 0;
      }
      avgYahooBids.push(players[i].auctionValue);
    }
  }
  players.sort((a, b) => a.originalRank - b.originalRank);
  avgYahooBids.sort((a, b) => b - a);
}

export function assignHRankAuctionValues(players, avgYahooBids, avgBids) {
  if (players) {
    for (let i = 0; i < players.length; i++) {
      players[i].valuedAt = avgYahooBids[i]
      if (!players[i].valuedAt || isNaN(players[i].valuedAt)) {
        players[i].valuedAt = 0;
      }
      players[i].avgAuctionValue = ((players[i].auctionValue + players[i].valuedAt) / 2).toFixed(2)
      avgBids.push(players[i].avgAuctionValue);
    }
  }
  players.sort((a, b) => b.avgAuctionValue - a.avgAuctionValue);
  avgBids.sort((a, b) => b - a);
}

export function assignSelfRanking(players, avgBids) {
  if (players) {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < selfRankingConfigs.length; j++) {
        if (players[i].name === selfRankingConfigs[j].name) {
          players[i].selfRank = selfRankingConfigs[j].selfRanking
          players[i].selfBid = parseFloat(avgBids[players[i].selfRank - 1])
        }
      }
      if (!players[i].selfRank) {
        players[i].selfRank = i + 1
        players[i].selfBid = parseFloat(avgBids[players[i].selfRank - 1])
      }
      players[i].avgAuctionValue = ((players[i].auctionValue + players[i].valuedAt + players[i].selfBid) / 3).toFixed(2)
    }
    players.sort((a, b) => b.avgAuctionValue - a.avgAuctionValue);
  }
}

export function assignGoftBids(players, auctionPlayers, goftBids) {
  if (auctionPlayers) {
    for (let j = 0; j < auctionPlayers.length; j++) {
      goftBids[j] = auctionPlayers[j].goftBid
    }
  }
  goftBids.sort((a, b) => b - a);

  if (players) {
    for (let i = 0; i < players.length; i++) {
      players[i].goftBid = goftBids[i]
      if (!players[i].goftBid || isNaN(players[i].goftBid)) {
        players[i].goftBid = 0;
      }
      players[i].avgAuctionValue = ((players[i].auctionValue + players[i].valuedAt + players[i].selfBid + players[i].goftBid) / 4).toFixed(2)
    }
    players.sort((a, b) => b.avgAuctionValue - a.avgAuctionValue);

    let pick = 1;
    let increasePick = true;
    let firstOfDoublePick = false;
    for (let i = 0; i < players.length; i++) {
      players[i].finalRank = i + 1;
      // players[i].finalRound = Math.ceil(players[i].finalRank / 10);
      players[i].finalRound = Math.ceil(players[i].finalRank / 12) + "." + pick;
      if (firstOfDoublePick && (pick === 1 || pick === 12)) {
        firstOfDoublePick = false
        continue;
      } else if (increasePick) {
        pick++;
        firstOfDoublePick = true
      } else {
        pick--;
        firstOfDoublePick = true
      }
      if (pick === 1) {
        increasePick = true;
      } else if (pick === 12) {
        increasePick = false;
      }
    }
  }
}