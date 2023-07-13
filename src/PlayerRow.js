import React from 'react';

function PlayerRow({
  index,
  selectedValueIndex,
  player
}) {
  const isElitePoints = player.points >= 30;
  const isGreatPoints = player.points >= 25 && player.points < 30;
  const isGoodPoints = player.points >= 20 && player.points < 25;
  const isPoorPoints = player.points >= 10 && player.points < 15;
  const isBadPoints = player.points < 10;

  const isEliteThreePointMade = player.threePointMade >= 4;
  const isGreatThreePointMade = player.threePointMade >= 3 && player.threePointMade < 4;
  const isGoodThreePointMade = player.threePointMade >= 2 && player.threePointMade < 3;
  const isPoorThreePointMade = player.threePointMade >= 1 && player.threePointMade < 1.5;
  const isBadThreePointMade = player.threePointMade < 1;

  const isEliteTotalRebounds = player.totalRebounds >= 10;
  const isGreatTotalRebounds = player.totalRebounds >= 9 && player.totalRebounds < 10;
  const isGoodTotalRebounds = player.totalRebounds >= 7 && player.totalRebounds < 9;
  const isPoorTotalRebounds = player.totalRebounds >= 3 && player.totalRebounds < 5;
  const isBadTotalRebounds = player.totalRebounds < 3;

  const isEliteAssists = player.assists >= 8;
  const isGreatAssists = player.assists >= 6 && player.assists < 8;
  const isGoodAssists = player.assists >= 4 && player.assists < 6;
  const isPoorAssists = player.assists >= 1 && player.assists < 2;
  const isBadAssists = player.assists < 1;

  const isEliteSteals = player.steals >= 2;
  const isGreatSteals = player.steals >= 1.5 && player.steals < 2;
  const isGoodSteals = player.steals >= 1 && player.steals < 1.5;
  const isPoorSteals = player.steals >= 0.5 && player.steals < 0.7;
  const isBadSteals = player.steals < 0.5;

  const isEliteBlocks = player.blocks >= 1.5;
  const isGreatBlocks = player.blocks >= 1.2 && player.blocks < 1.5;
  const isGoodBlocks = player.blocks >= 0.8 && player.blocks < 1.2;
  const isPoorBlocks = player.blocks >= 0.3 && player.blocks < 0.5;
  const isBadBlocks = player.blocks < 0.3;

  const isEliteTurnovers = player.turnovers <= 0.7;
  const isGreatTurnovers = player.turnovers <= 1 && player.turnovers > 0.7;
  const isGoodTurnovers = player.turnovers <= 1.5 && player.turnovers > 1;
  const isPoorTurnovers = player.turnovers < 3 && player.turnovers >= 2;
  const isBadTurnovers = player.turnovers >= 3;

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
