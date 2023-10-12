const selfRankingConfigs = require('./../configs/SelfRankingConfigs.js');

// Function to assign auctionValue to each player in the players array
export function assignAuctionValues(players, auctionPlayers, avgBids) {
  if (players && auctionPlayers) {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < auctionPlayers.length; j++) {
        if (players[i].name === auctionPlayers[j].name) {
          players[i].auctionValue = parseFloat(auctionPlayers[j].yahooAvg.replace('$', '').replace(/\.?0+$/, ''))
          players[i].valuedAt = parseFloat(auctionPlayers[j].valuedAt.replace('$', '').replace(/\.?0+$/, ''))
        }
      }
      if (!players[i].auctionValue || isNaN(players[i].auctionValue)) {
        players[i].auctionValue = 0;
      }
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

export function assignGoftBids(players, auctionPlayers) {
  if (players && auctionPlayers) {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < auctionPlayers.length; j++) {
        if (players[i].name === auctionPlayers[j].name) {
          players[i].goftBid = parseFloat(auctionPlayers[j].goftBid)
        }
      }
      if (!players[i].goftBid || isNaN(players[i].goftBid)) {
        players[i].goftBid = 0;
      }
      players[i].avgAuctionValue = ((players[i].auctionValue + players[i].valuedAt + players[i].selfBid + players[i].goftBid) / 4).toFixed(2)
    }
    players.sort((a, b) => b.avgAuctionValue - a.avgAuctionValue);
  }
}