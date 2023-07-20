import React from 'react';

function PlayerRow({
  matchedValues,
  selectedValueIndex
}) {
  const playerRows = matchedValues.map((player, index) => {
    return (
      <tr key={index} className={index === selectedValueIndex ? 'selected' : ''}>
        <td className="bold centered">{player.originalRank}</td>
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
        <td
          className={
            player.fieldGoalClass === 'elite' ? 'bold centered dark-green' :
            player.fieldGoalClass === 'vgood' ? 'bold centered green' :
            player.fieldGoalClass === 'good' ? 'bold centered light-green' :
            player.fieldGoalClass === 'bavg' ? 'bold centered light-red' :
            player.fieldGoalClass === 'ngood' ? 'bold centered red' : 'bold centered'
          }>
          {player.fieldGoal} ({player.fieldGoalMade}/{player.fieldGoalAttempt})
        </td>
        <td
          className={
            player.freeThrowClass === 'elite' ? 'bold centered dark-green' :
            player.freeThrowClass === 'vgood' ? 'bold centered green' :
            player.freeThrowClass === 'good' ? 'bold centered light-green' :
            player.freeThrowClass === 'bavg' ? 'bold centered light-red' :
            player.freeThrowClass === 'ngood' ? 'bold centered red' : 'bold centered'
          }>
          {player.freeThrow} ({player.freeThrowMade}/{player.freeThrowAttempt})
        </td>
        <td
          className={
            player.threePointMade >= 4 ? 'bold centered dark-green' :
            player.threePointMade >= 3 && player.threePointMade < 4 ? 'bold centered green' :
            player.threePointMade >= 2 && player.threePointMade < 3 ? 'bold centered light-green' :
            player.threePointMade >= 1 && player.threePointMade < 1.5 ? 'bold centered light-red' :
            player.threePointMade < 1 ? 'bold centered red' : 'bold centered'
          }>
          {player.threePointMade}
        </td>
        <td
          className={
            player.points >= 30 ? 'bold centered dark-green' :
            player.points >= 25 && player.points < 30 ? 'bold centered green' :
            player.points >= 20 && player.points < 25 ? 'bold centered light-green' :
            player.points >= 10 && player.points < 15 ? 'bold centered light-red' :
            player.points < 10 ? 'bold centered red' : 'bold centered'
          }>
          {player.points}
        </td>
        <td
          className={
            player.totalRebounds >= 10 ? 'bold centered dark-green' :
            player.totalRebounds >= 9 && player.totalRebounds < 10 ? 'bold centered green' :
            player.totalRebounds >= 7 && player.totalRebounds < 9 ? 'bold centered light-green' :
            player.totalRebounds >= 3 && player.totalRebounds < 5 ? 'bold centered light-red' :
            player.totalRebounds < 3 ? 'bold centered red' : 'bold centered'
          }>
          {player.totalRebounds}
        </td>
        <td
          className={
            player.assists >= 8 ? 'bold centered dark-green' :
            player.assists >= 6 && player.assists < 8 ? 'bold centered green' :
            player.assists >= 4 && player.assists < 6 ? 'bold centered light-green' :
            player.assists >= 1 && player.assists < 2 ? 'bold centered light-red' :
            player.assists < 1 ? 'bold centered red' : 'bold centered'
          }>
          {player.assists}
        </td>
        <td
          className={
            player.steals >= 2 ? 'bold centered dark-green' :
            player.steals >= 1.5 && player.steals < 2 ? 'bold centered green' :
            player.steals >= 1 && player.steals < 1.5 ? 'bold centered light-green' :
            player.steals >= 0.5 && player.steals < 0.7 ? 'bold centered light-red' :
            player.steals < 0.5 ? 'bold centered red' : 'bold centered'
          }>
          {player.steals}
        </td>
        <td
          className={
            player.blocks >= 1.5 ? 'bold centered dark-green' :
            player.blocks >= 1.2 && player.blocks < 1.5 ? 'bold centered green' :
            player.blocks >= 0.8 && player.blocks < 1.2 ? 'bold centered light-green' :
            player.blocks >= 0.3 && player.blocks < 0.5 ? 'bold centered light-red' :
            player.blocks < 0.3 ? 'bold centered red' : 'bold centered'
          }>
          {player.blocks}
        </td>
        <td
          className={
            player.turnovers <= 0.7 ? 'bold centered dark-green' :
            player.turnovers <= 1 && player.turnovers > 0.7 ? 'bold centered green' :
            player.turnovers <= 1.5 && player.turnovers > 1 ? 'bold centered light-green' :
            player.turnovers < 3 && player.turnovers >= 2 ? 'bold centered light-red' :
            player.turnovers >= 3 ? 'bold centered red' : 'bold centered'
          }>
          {player.turnovers}
        </td>
        <td className="bold centered">{player.total}</td>
      </tr>
    );
  });

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
                <th className="bold centered">FG</th>
                <th className="bold centered">FT</th>
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
    </>
  );
}

export default PlayerRow;
