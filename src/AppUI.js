import React from 'react';

function AppUI({
  inputValue,
  matchedValues,
  selectedValueIndex,
  setInputValue,
  setMatchedValues,
  setSelectedValueIndex,
  players,
  handleKeyDown,
}) {
  const playerRows = matchedValues.map((player, index) => (
    <tr key={index} className={index === selectedValueIndex ? 'selected' : ''}>
      <td className="centered">{player.rank}</td>
      <td className="centered">{player.adp}</td>
      <td className="centered">{player.name}</td>
      <td className="centered">{player.position}</td>
      <td className="centered">{player.team}</td>
      <td className="centered">{player.gp}</td>
      <td className="centered">{player.minutesPerGame}</td>
      <td className="centered">{player.fieldGoal}</td>
      <td className="centered">{player.fieldGoalMade}</td>
      <td className="centered">{player.fieldGoalAttempt}</td>
      <td className="centered">{player.freeThrow}</td>
      <td className="centered">{player.freeThrowMade}</td>
      <td className="centered">{player.freeThrowAttempt}</td>
      <td className="centered">{player.threePointMade}</td>
      <td className="centered">{player.points}</td>
      <td className="centered">{player.totalRebounds}</td>
      <td className="centered">{player.assists}</td>
      <td className="centered">{player.steals}</td>
      <td className="centered">{player.blocks}</td>
      <td className="centered">{player.turnovers}</td>
      <td className="centered">{player.total}</td>
    </tr>
  ));

  const selectedPlayer = players.find((player) => player.name === inputValue);

  return (
    <>
      {matchedValues.length > 0 && (
        <div>
          <p>Matched values:</p>
          <table className="bordered-table">
            <thead>
              <tr>
                <th className="centered">RANK</th>
                <th className="centered">ADP</th>
                <th className="centered">PLAYER</th>
                <th className="centered">POS</th>
                <th className="centered">TEAM</th>
                <th className="centered">GP</th>
                <th className="centered">MPG</th>
                <th className="centered">FG%</th>
                <th className="centered">FGM</th>
                <th className="centered">FGA</th>
                <th className="centered">FT%</th>
                <th className="centered">FTM</th>
                <th className="centered">FTA</th>
                <th className="centered">3PM</th>
                <th className="centered">PTS</th>
                <th className="centered">TREB</th>
                <th className="centered">AST</th>
                <th className="centered">STL</th>
                <th className="centered">BLK</th>
                <th className="centered">TO</th>
                <th className="centered">TOTAL</th>
              </tr>
            </thead>
            <tbody>{playerRows}</tbody>
          </table>
        </div>
      )}
      {selectedPlayer && (
        <div>
          <p>Entered value:</p>
          <table className="bordered-table">
            <thead>
              <tr>
                <th className="centered">RANK</th>
                <th className="centered">ADP</th>
                <th className="centered">PLAYER</th>
                <th className="centered">POS</th>
                <th className="centered">TEAM</th>
                <th className="centered">GP</th>
                <th className="centered">MPG</th>
                <th className="centered">FG%</th>
                <th className="centered">FGM</th>
                <th className="centered">FGA</th>
                <th className="centered">FT%</th>
                <th className="centered">FTM</th>
                <th className="centered">FTA</th>
                <th className="centered">3PM</th>
                <th className="centered">PTS</th>
                <th className="centered">TREB</th>
                <th className="centered">AST</th>
                <th className="centered">STL</th>
                <th className="centered">BLK</th>
                <th className="centered">TO</th>
                <th className="centered">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="centered">{selectedPlayer.rank}</td>
                <td className="centered">{selectedPlayer.adp}</td>
                <td className="centered">{selectedPlayer.name}</td>
                <td className="centered">{selectedPlayer.position}</td>
                <td className="centered">{selectedPlayer.team}</td>
                <td className="centered">{selectedPlayer.gp}</td>
                <td className="centered">{selectedPlayer.minutesPerGame}</td>
                <td className="centered">{selectedPlayer.fieldGoal}</td>
                <td className="centered">{selectedPlayer.fieldGoalMade}</td>
                <td className="centered">{selectedPlayer.fieldGoalAttempt}</td>
                <td className="centered">{selectedPlayer.freeThrow}</td>
                <td className="centered">{selectedPlayer.freeThrowMade}</td>
                <td className="centered">{selectedPlayer.freeThrowAttempt}</td>
                <td className="centered">{selectedPlayer.threePointMade}</td>
                <td className="centered">{selectedPlayer.points}</td>
                <td className="centered">{selectedPlayer.totalRebounds}</td>
                <td className="centered">{selectedPlayer.assists}</td>
                <td className="centered">{selectedPlayer.steals}</td>
                <td className="centered">{selectedPlayer.blocks}</td>
                <td className="centered">{selectedPlayer.turnovers}</td>
                <td className="centered">{selectedPlayer.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AppUI;
