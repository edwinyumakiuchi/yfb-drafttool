import React from 'react';
import { getPercentageClassification, getCountingClassification, getTurnoverClassification } from './../utils/ClassificationUtils';

function PlayerRow({
  matchedValues,
  selectedValueIndex,
  leagueAverages }) {
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
        <td className={getPercentageClassification('fieldgoal', player.fieldGoalMade, player.fieldGoalAttempt, leagueAverages)}>
          {player.fieldGoal} ({player.fieldGoalMade}/{player.fieldGoalAttempt})
        </td>
        <td className={getPercentageClassification('freethrow', player.freeThrowMade, player.freeThrowAttempt, leagueAverages)}>
          {player.freeThrow} ({player.freeThrowMade}/{player.freeThrowAttempt})
        </td>
        <td className={getCountingClassification('threePoint', player.threePointMade)}>
          {player.threePointMade}
        </td>
        <td className={getCountingClassification('point', player.points)}>
          {player.points}
        </td>
        <td className={getCountingClassification('rebound', player.totalRebounds)}>
          {player.totalRebounds}
        </td>
        <td className={getCountingClassification('assist', player.assists)}>
          {player.assists}
        </td>
        <td className={getCountingClassification('steal', player.steals)}>
          {player.steals}
        </td>
        <td className={getCountingClassification('block', player.blocks)}>
          {player.blocks}
        </td>
        <td className={getTurnoverClassification(player.turnovers)}>
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
