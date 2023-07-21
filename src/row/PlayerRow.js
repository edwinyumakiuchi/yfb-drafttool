import React from 'react';
import { getFieldGoalClass, getFreeThrowClass, getThreePointMadeClass, getPointClass, getReboundClass, getAssistClass,
         getStealClass, getBlockClass, getTurnoverClass } from './../utils/ClassificationUtils';

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
        <td className={getFieldGoalClass(player.fieldGoalMade, player.fieldGoalAttempt, leagueAverages)}>
          {player.fieldGoal} ({player.fieldGoalMade}/{player.fieldGoalAttempt})
        </td>
        <td className={getFreeThrowClass(player.freeThrowMade, player.freeThrowAttempt, leagueAverages)}>
          {player.freeThrow} ({player.freeThrowMade}/{player.freeThrowAttempt})
        </td>
        <td className={getThreePointMadeClass(player.threePointMade)}>
          {player.threePointMade}
        </td>
        <td className={getPointClass(player.points)}>
          {player.points}
        </td>
        <td className={getReboundClass(player.totalRebounds)}>
          {player.totalRebounds}
        </td>
        <td className={getAssistClass(player.assists)}>
          {player.assists}
        </td>
        <td className={getStealClass(player.steals)}>
          {player.steals}
        </td>
        <td className={getBlockClass(player.blocks)}>
          {player.blocks}
        </td>
        <td className={getTurnoverClass(player.turnovers)}>
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
