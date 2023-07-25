// AuctionUtils.js

// Function to sort auctionPlayers based on yahooAvg in descending order
export function sortAuctionPlayers(auctionPlayers) {
  if (auctionPlayers) {
    auctionPlayers.forEach((player) => {
      if (typeof player.yahooAvg === 'string' && player.yahooAvg.startsWith('$')) {
        player.yahooAvg = parseFloat(player.yahooAvg.slice(1));
      } else {
        player.yahooAvg = parseFloat(player.yahooAvg);
      }

      if (isNaN(player.yahooAvg) || player.yahooAvg === undefined) {
        player.yahooAvg = 1;
      }
    });

    auctionPlayers.sort((a, b) => b.yahooAvg - a.yahooAvg);
  }
}

// Function to assign auctionValue to each player in the players array
export function assignAuctionValues(players, auctionPlayers) {
  if (players && auctionPlayers) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (auctionPlayers[i]) {
        player.auctionValue = auctionPlayers[i].yahooAvg;
      } else {
        player.auctionValue = 1;
      }
    }
  }
}
