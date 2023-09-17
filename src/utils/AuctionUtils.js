// Function to assign auctionValue to each player in the players array
export function assignAuctionValues(players, auctionPlayers) {
  if (players && auctionPlayers) {
    for (let i = 0; i < players.length; i++) {
      for (let j = 0; j < auctionPlayers.length; j++) {
        if (players[i].name === auctionPlayers[j].name) {
          players[i].auctionValue = parseFloat(auctionPlayers[j].yahooAvg.replace('$', '').replace(/\.?0+$/, ''))
          players[i].valuedAt = parseFloat(auctionPlayers[j].valuedAt.replace('$', '').replace(/\.?0+$/, ''))
          players[i].goftBid = parseFloat(auctionPlayers[j].goftBid)
        }
      }
      if (!players[i].auctionValue || isNaN(players[i].auctionValue)) {
        players[i].auctionValue = 0;
      }
      if (!players[i].valuedAt || isNaN(players[i].valuedAt)) {
        players[i].valuedAt = 0;
      }
      if (!players[i].goftBid || isNaN(players[i].goftBid)) {
        players[i].goftBid = 0;
      }
      players[i].avgAuctionValue = ((players[i].auctionValue + players[i].valuedAt + players[i].goftBid) / 3).toFixed(2)
    }
  }
  players.sort((a, b) => b.avgAuctionValue - a.avgAuctionValue);
}