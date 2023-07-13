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
  handleSort,
  sortField,
  sortOrder
}) {
  const playerRows = matchedValues.map((player, index) => {
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

    /* const isEliteFieldgoal = player.fieldGoal >= 0.55;
    const isGreatFieldgoal = player.fieldGoal >= 0.5 && player.fieldGoal < 0.55;
    const isGoodFieldgoal = player.fieldGoal >= 0.475 && player.fieldGoal < 0.5;
    const isPoorFieldgoal = player.fieldGoal >= 0.425 && player.fieldGoal < 0.45;
    const isBadFieldgoal = player.fieldGoal < 0.425;

    const isMaxFieldgoalAttempts = player.fieldGoalAttempt >= 18;
    const isExtremeFieldgoalAttempts = player.fieldGoalAttempt >= 14 && player.fieldGoalAttempt < 18;
    const isHighFieldgoalAttempts = player.fieldGoalAttempt >= 12 && player.fieldGoalAttempt < 14;
    const isLowFieldgoalAttempts = player.fieldGoalAttempt >= 10 && player.fieldGoalAttempt < 12;
    const isMinFieldgoalAttemptsl = player.fieldGoalAttempt >= 7 && player.fieldGoalAttempt < 10; */

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
        {/* <td
            className={
              isEliteFieldgoal ? 'bold centered dark-green' :
              isGreatFieldgoal ? 'bold centered green' :
              isGoodFieldgoal ? 'bold centered light-green' :
              isPoorFieldgoal ? 'bold centered light-red' :
              isBadFieldgoal ? 'bold centered red' : 'bold centered'
            }>
                {player.fieldGoal}
        </td> */}
        <td className="bold centered">{player.fieldGoal}</td>
        <td className="bold centered">{player.fieldGoalMade}</td>
        <td className="bold centered">{player.fieldGoalAttempt}</td>
        {/* <td
            className={
              isMaxFieldgoalAttempts ? 'bold centered darkest-blue' :
              isExtremeFieldgoalAttempts ? 'bold centered dark-blue' :
              isHighFieldgoalAttempts ? 'bold centered blue' :
              isLowFieldgoalAttempts ? 'bold centered light-blue' :
              isMinFieldgoalAttemptsl ? 'bold centered lightest-blue' : 'bold centered'
            }>
                {player.fieldGoalAttempt}
        </td> */}
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
                <th className="bold centered">ORANK</th>
                <th className="bold centered">ADP</th>
                <th className="bold centered">PLAYER</th>
                <th className="bold centered">POS</th>
                <th className="bold centered">TEAM</th>
                <th className="bold centered">GP</th>
                <th className="bold centered">MPG</th>
                <th className="bold centered" onClick={() => handleSort('fieldGoal')}>
                  FG% {sortField === 'fieldGoal'}
                </th>
                <th className="bold centered">FGM</th>
                <th className="bold centered" onClick={() => handleSort('fieldGoalAttempt')}>
                  FGA {sortField === 'fieldGoalAttempt'}
                </th>
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
      {selectedPlayer && (
        <div>
          <p></p>
          <table className="bordered-table">
            <thead className="header-row">
              <tr>
                <th className="bold centered">ORANK</th>
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
            <tbody>
              <tr>
                <td className="bold centered">{selectedPlayer.originalRank}</td>
                <td className="bold centered">{selectedPlayer.adp}</td>
                <td className="bold centered">{selectedPlayer.name}</td>
                <td className="bold centered">{selectedPlayer.position}</td>
                <td className="bold centered">{selectedPlayer.team}</td>
                <td className="bold centered">{selectedPlayer.gp}</td>
                <td className="bold centered">{selectedPlayer.minutesPerGame}</td>
                {/* <td
                  className={
                    selectedPlayer.fieldGoal >= 0.55 ? 'bold centered dark-green' :
                    selectedPlayer.fieldGoal >= 0.5 && selectedPlayer.fieldGoal < 0.55 ? 'bold centered green' :
                    selectedPlayer.fieldGoal >= 0.475 && selectedPlayer.fieldGoal < 0.5 ? 'bold centered light-green' :
                    selectedPlayer.fieldGoal >= 0.425 && selectedPlayer.fieldGoal < 0.45 ? 'bold centered light-red' :
                    selectedPlayer.fieldGoal < 0.425 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.fieldGoal}
                </td> */}
                <td className="bold centered">{selectedPlayer.fieldGoal}</td>
                <td className="bold centered">{selectedPlayer.fieldGoalMade}</td>
                <td className="bold centered">{selectedPlayer.fieldGoalAttempt}</td>
                <td className="bold centered">{selectedPlayer.freeThrow}</td>
                <td className="bold centered">{selectedPlayer.freeThrowMade}</td>
                <td className="bold centered">{selectedPlayer.freeThrowAttempt}</td>
                <td
                  className={
                    selectedPlayer.fieldGoalClass === 'elite' ? 'bold centered dark-green' :
                    selectedPlayer.fieldGoalClass === 'vgood' ? 'bold centered green' :
                    selectedPlayer.fieldGoalClass == 'good' ? 'bold centered light-green' :
                    selectedPlayer.fieldGoalClass === 'bavg' ? 'bold centered light-red' :
                    selectedPlayer.fieldGoalClass === 'ngood' ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.fieldGoal} ({selectedPlayer.fieldGoalMade}/{selectedPlayer.fieldGoalAttempt})
                </td>
                <td
                  className={
                    selectedPlayer.freeThrowClass === 'elite' ? 'bold centered dark-green' :
                    selectedPlayer.freeThrowClass === 'vgood' ? 'bold centered green' :
                    selectedPlayer.freeThrowClass == 'good' ? 'bold centered light-green' :
                    selectedPlayer.freeThrowClass === 'bavg' ? 'bold centered light-red' :
                    selectedPlayer.freeThrowClass === 'ngood' ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.freeThrow} ({selectedPlayer.freeThrowMade}/{selectedPlayer.freeThrowAttempt})
                </td>
                <td
                  className={
                    selectedPlayer.threePointMade >= 4 ? 'bold centered dark-green' :
                    selectedPlayer.threePointMade >= 3 && selectedPlayer.threePointMade < 4 ? 'bold centered green' :
                    selectedPlayer.threePointMade >= 2 && selectedPlayer.threePointMade < 3 ? 'bold centered light-green' :
                    selectedPlayer.threePointMade >= 1 && selectedPlayer.threePointMade < 1.5 ? 'bold centered light-red' :
                    selectedPlayer.threePointMade < 1 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.threePointMade}
                </td>
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
                <td
                  className={
                    selectedPlayer.totalRebounds >= 10 ? 'bold centered dark-green' :
                    selectedPlayer.totalRebounds >= 9 && selectedPlayer.totalRebounds < 10 ? 'bold centered green' :
                    selectedPlayer.totalRebounds >= 7 && selectedPlayer.totalRebounds < 9 ? 'bold centered light-green' :
                    selectedPlayer.totalRebounds >= 3 && selectedPlayer.totalRebounds < 5 ? 'bold centered light-red' :
                    selectedPlayer.totalRebounds < 3 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.totalRebounds}
                </td>
                <td
                  className={
                    selectedPlayer.assists >= 8 ? 'bold centered dark-green' :
                    selectedPlayer.assists >= 6 && selectedPlayer.assists < 8 ? 'bold centered green' :
                    selectedPlayer.assists >= 4 && selectedPlayer.assists < 6 ? 'bold centered light-green' :
                    selectedPlayer.assists >= 1 && selectedPlayer.assists < 2 ? 'bold centered light-red' :
                    selectedPlayer.assists < 1 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.assists}
                </td>
                <td
                  className={
                    selectedPlayer.steals >= 2 ? 'bold centered dark-green' :
                    selectedPlayer.steals >= 1.5 && selectedPlayer.steals < 2 ? 'bold centered green' :
                    selectedPlayer.steals >= 1 && selectedPlayer.steals < 1.5 ? 'bold centered light-green' :
                    selectedPlayer.steals >= 0.5 && selectedPlayer.steals < 0.7 ? 'bold centered light-red' :
                    selectedPlayer.steals < 0.5 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.steals}
                </td>
                <td
                  className={
                    selectedPlayer.blocks >= 1.5 ? 'bold centered dark-green' :
                    selectedPlayer.blocks >= 1.2 && selectedPlayer.blocks < 1.5 ? 'bold centered green' :
                    selectedPlayer.blocks >= 0.8 && selectedPlayer.blocks < 1.2 ? 'bold centered light-green' :
                    selectedPlayer.blocks >= 0.3 && selectedPlayer.blocks < 0.5 ? 'bold centered light-red' :
                    selectedPlayer.blocks < 0.3 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.blocks}
                </td>
                <td
                  className={
                    selectedPlayer.turnovers <= 0.7 ? 'bold centered dark-green' :
                    selectedPlayer.turnovers <= 1 && selectedPlayer.turnovers > 0.7 ? 'bold centered green' :
                    selectedPlayer.turnovers <= 1.5 && selectedPlayer.turnovers > 1 ? 'bold centered light-green' :
                    selectedPlayer.turnovers < 3 && selectedPlayer.turnovers >= 2 ? 'bold centered light-red' :
                    selectedPlayer.turnovers >= 3 ? 'bold centered red' : 'bold centered'
                  }>
                    {selectedPlayer.turnovers}
                </td>
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
