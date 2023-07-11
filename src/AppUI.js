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
  const playerRows = matchedValues.map((player, index) => {
    const selectedPlayer = players[selectedValueIndex];
    const isElitePoints = player.points >= 30;
    const isGreatPoints = player.points >= 25 && player.points < 30;
    const isGoodPoints = player.points >= 20 && player.points < 25;
    const isPoorPoints = player.points >= 10 && player.points < 15;
    const isBadPoints = player.points < 10;

    return (
      <tr key={index} className={index === selectedValueIndex ? 'selected' : ''}>
        <td className="bold centered">{player.rank}</td>
        <td className="bold centered">{player.adp}</td>
        <td className="bold centered">{player.name}</td>
        <td className="bold centered">{player.position}</td>
        <td className="bold centered">{player.team}</td>
        <td className="bold centered">{player.gp}</td>
        <td className="bold centered">{player.minutesPerGame}</td>
        <td className="bold centered">{player.fieldGoal}</td>
        <td className="bold centered">{player.fieldGoalMade}</td>
        <td className="bold centered">{player.fieldGoalAttempt}</td>
        <td className="bold centered">{player.freeThrow}</td>
        <td className="bold centered">{player.freeThrowMade}</td>
        <td className="bold centered">{player.freeThrowAttempt}</td>
        <td className="bold centered">{player.threePointMade}</td>
        <td
            className={
              isElitePoints ? 'bold centered dark-green' :
              isGreatPoints ? 'bold centered green' :
              isGoodPoints ? 'bold centered light-green' :
              isPoorPoints ? 'bold centered light-red' :
              isBadPoints ? 'bold centered red' : 'bold centered'
            }>
                {player.points}
        </td>
        <td className="bold centered">{player.totalRebounds}</td>
        <td className="bold centered">{player.assists}</td>
        <td className="bold centered">{player.steals}</td>
        <td className="bold centered">{player.blocks}</td>
        <td className="bold centered">{player.turnovers}</td>
        <td className="bold centered">{player.total}</td>
      </tr>
    );
  });

  const selectedPlayer = players.find((player) => player.name === inputValue);

  return (
    <>
      {matchedValues.length > 0 && (
        <div>
          <p></p>
          <table className="bordered-table">
            <thead className="header-row">
              <tr>
                <th className="bold centered">RANK</th>
                <th className="bold centered">ADP</th>
                <th className="bold centered">PLAYER</th>
                <th className="bold centered">POS</th>
                <th className="bold centered">TEAM</th>
                <th className="bold centered">GP</th>
                <th className="bold centered">MPG</th>
                <th className="bold centered">FG%</th>
                <th className="bold centered">FGM</th>
                <th className="bold centered">FGA</th>
                <th className="bold centered">FT%</th>
                <th className="bold centered">FTM</th>
                <th className="bold centered">FTA</th>
                <th className="bold centered">3PM</th>
                <th className="bold centered">PTS</th>
                <th className="bold centered">TREB</th>
                <th className="bold centered">AST</th>
                <th className="bold centered">STL</th>
                <th className="bold centered">BLK</th>
                <th className="bold centered">TO</th>
                <th className="bold centered">TOTAL</th>
              </tr>
            </thead>
            <tbody>{playerRows}</tbody>
          </table>
        </div>
      )}
      {selectedPlayer && (
        <div>
          <p></p>
          <table className="bordered-table">
            <thead className="header-row">
              <tr>
                <th className="bold centered">RANK</th>
                <th className="bold centered">ADP</th>
                <th className="bold centered">PLAYER</th>
                <th className="bold centered">POS</th>
                <th className="bold centered">TEAM</th>
                <th className="bold centered">GP</th>
                <th className="bold centered">MPG</th>
                <th className="bold centered">FG%</th>
                <th className="bold centered">FGM</th>
                <th className="bold centered">FGA</th>
                <th className="bold centered">FT%</th>
                <th className="bold centered">FTM</th>
                <th className="bold centered">FTA</th>
                <th className="bold centered">3PM</th>
                <th className="bold centered">PTS</th>
                <th className="bold centered">TREB</th>
                <th className="bold centered">AST</th>
                <th className="bold centered">STL</th>
                <th className="bold centered">BLK</th>
                <th className="bold centered">TO</th>
                <th className="bold centered">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bold centered">{selectedPlayer.rank}</td>
                <td className="bold centered">{selectedPlayer.adp}</td>
                <td className="bold centered">{selectedPlayer.name}</td>
                <td className="bold centered">{selectedPlayer.position}</td>
                <td className="bold centered">{selectedPlayer.team}</td>
                <td className="bold centered">{selectedPlayer.gp}</td>
                <td className="bold centered">{selectedPlayer.minutesPerGame}</td>
                <td className="bold centered">{selectedPlayer.fieldGoal}</td>
                <td className="bold centered">{selectedPlayer.fieldGoalMade}</td>
                <td className="bold centered">{selectedPlayer.fieldGoalAttempt}</td>
                <td className="bold centered">{selectedPlayer.freeThrow}</td>
                <td className="bold centered">{selectedPlayer.freeThrowMade}</td>
                <td className="bold centered">{selectedPlayer.freeThrowAttempt}</td>
                <td className="bold centered">{selectedPlayer.threePointMade}</td>
                <td
                  className={
                    selectedPlayer.points >= 30 ? 'bold centered dark-green' :
                    selectedPlayer.points >= 25 && selectedPlayer.points < 30 ? 'bold centered green' :
                    selectedPlayer.points >= 20 && selectedPlayer.points < 25 ? 'bold centered light-green' :
                    selectedPlayer.points >= 10 && selectedPlayer.points < 15 ? 'bold centered light-red' :
                    selectedPlayer.points < 10 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.points}
                </td>
                <td className="bold centered">{selectedPlayer.totalRebounds}</td>
                <td className="bold centered">{selectedPlayer.assists}</td>
                <td className="bold centered">{selectedPlayer.steals}</td>
                <td className="bold centered">{selectedPlayer.blocks}</td>
                <td className="bold centered">{selectedPlayer.turnovers}</td>
                <td className="bold centered">{selectedPlayer.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AppUI;
