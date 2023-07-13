import React from 'react';
import PlayerRow from './PlayerRow';

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

    return (
      <PlayerRow
        key={index}
        index={index}
        selectedValueIndex={selectedValueIndex}
        player={player}
        isEliteThreePointMade={isEliteThreePointMade}
        isGreatThreePointMade={isGreatThreePointMade}
        isGoodThreePointMade={isGoodThreePointMade}
        isPoorThreePointMade={isPoorThreePointMade}
        isBadThreePointMade={isBadThreePointMade}
        isElitePoints={isElitePoints}
        isGreatPoints={isGreatPoints}
        isGoodPoints={isGoodPoints}
        isPoorPoints={isPoorPoints}
        isBadPoints={isBadPoints}
        isEliteTotalRebounds={isEliteTotalRebounds}
        isGreatTotalRebounds={isGreatTotalRebounds}
        isGoodTotalRebounds={isGoodTotalRebounds}
        isPoorTotalRebounds={isPoorTotalRebounds}
        isBadTotalRebounds={isBadTotalRebounds}
        isEliteAssists={isEliteAssists}
        isGreatAssists={isGreatAssists}
        isGoodAssists={isGoodAssists}
        isPoorAssists={isPoorAssists}
        isBadAssists={isBadAssists}
        isEliteSteals={isEliteSteals}
        isGreatSteals={isGreatSteals}
        isGoodSteals={isGoodSteals}
        isPoorSteals={isPoorSteals}
        isBadSteals={isBadSteals}
        isEliteBlocks={isEliteBlocks}
        isGreatBlocks={isGreatBlocks}
        isGoodBlocks={isGoodBlocks}
        isPoorBlocks={isPoorBlocks}
        isBadBlocks={isBadBlocks}
        isEliteTurnovers={isEliteTurnovers}
        isGreatTurnovers={isGreatTurnovers}
        isGoodTurnovers={isGoodTurnovers}
        isPoorTurnovers={isPoorTurnovers}
        isBadTurnovers={isBadTurnovers}
      />
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
