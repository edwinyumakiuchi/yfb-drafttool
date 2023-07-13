import React from 'react';

function PlayerRow({
  index,
  selectedValueIndex,
  player,
  isEliteThreePointMade,
  isGreatThreePointMade,
  isGoodThreePointMade,
  isPoorThreePointMade,
  isBadThreePointMade,
  isElitePoints,
  isGreatPoints,
  isGoodPoints,
  isPoorPoints,
  isBadPoints,
  isEliteTotalRebounds,
  isGreatTotalRebounds,
  isGoodTotalRebounds,
  isPoorTotalRebounds,
  isBadTotalRebounds,
  isEliteAssists,
  isGreatAssists,
  isGoodAssists,
  isPoorAssists,
  isBadAssists,
  isEliteSteals,
  isGreatSteals,
  isGoodSteals,
  isPoorSteals,
  isBadSteals,
  isEliteBlocks,
  isGreatBlocks,
  isGoodBlocks,
  isPoorBlocks,
  isBadBlocks,
  isEliteTurnovers,
  isGreatTurnovers,
  isGoodTurnovers,
  isPoorTurnovers,
  isBadTurnovers
}) {
  return (
    <tr key={index} className={index === selectedValueIndex ? 'selected' : ''}>
      <td className="bold centered">{index + 1}</td>
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
          isEliteThreePointMade ? 'bold centered dark-green' :
          isGreatThreePointMade ? 'bold centered green' :
          isGoodThreePointMade ? 'bold centered light-green' :
          isPoorThreePointMade ? 'bold centered light-red' :
          isBadThreePointMade ? 'bold centered red' : 'bold centered'
        }>
        {player.threePointMade}
      </td>
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
      <td
        className={
          isEliteTotalRebounds ? 'bold centered dark-green' :
          isGreatTotalRebounds ? 'bold centered green' :
          isGoodTotalRebounds ? 'bold centered light-green' :
          isPoorTotalRebounds ? 'bold centered light-red' :
          isBadTotalRebounds ? 'bold centered red' : 'bold centered'
        }>
        {player.totalRebounds}
      </td>
      <td
        className={
          isEliteAssists ? 'bold centered dark-green' :
          isGreatAssists ? 'bold centered green' :
          isGoodAssists ? 'bold centered light-green' :
          isPoorAssists ? 'bold centered light-red' :
          isBadAssists ? 'bold centered red' : 'bold centered'
        }>
        {player.assists}
      </td>
      <td
        className={
          isEliteSteals ? 'bold centered dark-green' :
          isGreatSteals ? 'bold centered green' :
          isGoodSteals ? 'bold centered light-green' :
          isPoorSteals ? 'bold centered light-red' :
          isBadSteals ? 'bold centered red' : 'bold centered'
        }>
        {player.steals}
      </td>
      <td
        className={
          isEliteBlocks ? 'bold centered dark-green' :
          isGreatBlocks ? 'bold centered green' :
          isGoodBlocks ? 'bold centered light-green' :
          isPoorBlocks ? 'bold centered light-red' :
          isBadBlocks ? 'bold centered red' : 'bold centered'
        }>
        {player.blocks}
      </td>
      <td
        className={
          isEliteTurnovers ? 'bold centered dark-green' :
          isGreatTurnovers ? 'bold centered green' :
          isGoodTurnovers ? 'bold centered light-green' :
          isPoorTurnovers ? 'bold centered light-red' :
          isBadTurnovers ? 'bold centered red' : 'bold centered'
        }>
        {player.turnovers}
      </td>
      <td className="bold centered">{player.total}</td>
    </tr>
  );
}

export default PlayerRow;
