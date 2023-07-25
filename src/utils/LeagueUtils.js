export function calculateLeagueAverages(players) {
  return players.reduce((averages, player) => {
    Object.entries(player).forEach(([field, value]) => {
      if (field !== 'id' && !isNaN(parseFloat(value))) {
        averages[field] = (averages[field] || 0) + parseFloat(value);
      }
    });
    return averages;
  }, {});
}

export function countPositions(selectedPlayers) {
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
  const positionCounts = positions.reduce((acc, position) => {
    acc[position] = 0;
    return acc;
  }, {});

  Object.values(selectedPlayers).forEach((selectedPlayer) => {
    const playerPositions = selectedPlayer.position.split(',').map((pos) => pos.trim());
    playerPositions.forEach((position) => {
      if (positionCounts.hasOwnProperty(position)) {
        positionCounts[position]++;
      }
    });
  });

  return positionCounts;
}