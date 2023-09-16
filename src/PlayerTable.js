import React from 'react';
import { getPercentageClassification, getCountingClassification, getTurnoverClassification } from './utils/ClassificationUtils';

function PlayerTable({
  matchedPlayers,
  selectedPlayers,
  selectedPlayerIndex,
  leagueAverages,
  isSelectedPlayerTable }) {

  // Function to calculate column averages
  const calculateAverages = () => {
    const numPlayers = Object.values(selectedPlayers).length;
    const sum = (field) =>
      Object.values(selectedPlayers).reduce((acc, player) => {
        const fieldValue = parseFloat(player[field]); // Parse the field value as a float
        return isNaN(fieldValue) ? acc : acc + fieldValue; // Exclude NaN and add numeric values
      }, 0);

    const formatNumber = (num) => {
      const fixedNum = num.toFixed(Math.max(1, Math.min(3, 3)));
      const parsedNum = parseFloat(fixedNum);
      return isNaN(parsedNum) ? '' : (parsedNum % 1 === 0 ? parsedNum.toFixed(1) : parsedNum.toString());
    };

    return {
      fieldGoalMade: formatNumber(sum('fieldGoalMade') / numPlayers),
      fieldGoalAttempt: formatNumber(sum('fieldGoalAttempt') / numPlayers),
      freeThrowMade: formatNumber(sum('freeThrowMade') / numPlayers),
      freeThrowAttempt: formatNumber(sum('freeThrowAttempt') / numPlayers),
      threePointMade: formatNumber(sum('threePointMade') / numPlayers),
      points: formatNumber(sum('points') / numPlayers),
      totalRebounds: formatNumber(sum('totalRebounds') / numPlayers),
      assists: formatNumber(sum('assists') / numPlayers),
      steals: formatNumber(sum('steals') / numPlayers),
      blocks: formatNumber(sum('blocks') / numPlayers),
      turnovers: formatNumber(sum('turnovers') / numPlayers)
    };
  };

  const averages = isSelectedPlayerTable ? calculateAverages() : null;

  const playerRow = (player) => {
    return (
      <>
        <td className="bold centered">{player.originalRank}</td>
        {!isSelectedPlayerTable && (
          <>
          <td className="bold centered">{player.avgAuctionValue}</td>
          <td className="bold centered">{player.auctionValue}</td>
          <td className="bold centered">{player.goftBid}</td>
          </>
        )}
        <td className="bold centered">{player.adp}</td>
        <td className="bold centered">{player.name}</td>
        <td className="bold centered">{player.position}</td>
        <td className="bold centered">{player.team}</td>
        <td className="bold centered">{player.gp}</td>
        <td className="bold centered">{player.minutesPerGame}</td>
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
      </>
    );
  };

  return (
    <>
      {(isSelectedPlayerTable || matchedPlayers.length > 0) && (
        <div>
          <p></p>
          <table className="bordered-table">
            <thead className="header-row">
              <tr>
                <th className="bold centered">H-RANK</th>
                {!isSelectedPlayerTable && <th className="bold centered">AVG-AUCTION</th>}
                {!isSelectedPlayerTable && <th className="bold centered">Y-AUCTION</th>}
                {!isSelectedPlayerTable && <th className="bold centered">GOFT-AUCTION</th>}
                <th className="bold centered">Y-ADP</th>
                <th className="bold centered">PLAYER</th>
                <th className="bold centered">POS</th>
                <th className="bold centered">TEAM</th>
                <th className="bold centered">GP</th>
                <th className="bold centered">MPG</th>
                <th className="bold centered">FG</th>
                <th className="bold centered">FT</th>
                <th className="bold centered">3PM</th>
                <th className="bold centered">PTS</th>
                <th className="bold centered">TREB</th>
                <th className="bold centered">AST</th>
                <th className="bold centered">STL</th>
                <th className="bold centered">BLK</th>
                <th className="bold centered">TO</th>
              </tr>
            </thead>
            <tbody>
              {isSelectedPlayerTable
                ? (
                  <>
                    {Object.values(selectedPlayers).map((player) => (
                      <tr key={player.id}>
                        {playerRow(player)}
                      </tr>
                    ))}
                    {/* Render the row for averages */}
                    <tr>
                      <td className="bold centered">AVERAGE</td>
                      <td className="bold centered"></td>
                      <td className="bold centered"></td>
                      <td className="bold centered"></td>
                      <td className="bold centered"></td>
                      <td className="bold centered"></td>
                      <td className="bold centered"></td>
                      <td className={getPercentageClassification('fieldgoal', averages.fieldGoalMade, averages.fieldGoalAttempt, leagueAverages)}>
                        {isNaN(averages.fieldGoalMade / averages.fieldGoalAttempt)
                          ? ''
                          : `${(averages.fieldGoalMade / averages.fieldGoalAttempt).toFixed(3)} (${averages.fieldGoalMade}/${averages.fieldGoalAttempt})`}
                      </td>
                      <td className={getPercentageClassification('freethrow', averages.freeThrowMade, averages.freeThrowAttempt, leagueAverages)}>
                        {isNaN(averages.freeThrowMade / averages.freeThrowAttempt)
                          ? ''
                          : `${(averages.freeThrowMade / averages.freeThrowAttempt).toFixed(3)} (${averages.freeThrowMade}/${averages.freeThrowAttempt})`}
                      </td>
                      <td className={getCountingClassification('threePoint', averages.threePointMade)}>{averages.threePointMade}</td>
                      <td className={getCountingClassification('point', averages.points)}>{averages.points}</td>
                      <td className={getCountingClassification('rebound', averages.totalRebounds)}>{averages.totalRebounds}</td>
                      <td className={getCountingClassification('assist', averages.assists)}>{averages.assists}</td>
                      <td className={getCountingClassification('steal', averages.steals)}>{averages.steals}</td>
                      <td className={getCountingClassification('block', averages.blocks)}>{averages.blocks}</td>
                      <td className={getTurnoverClassification(averages.turnovers)}>{averages.turnovers}</td>
                    </tr>
                  </>
                )
                : matchedPlayers.map((player, index) => (
                    <tr key={index} className={index === selectedPlayerIndex ? 'selected' : ''}>
                      {playerRow(player)}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default PlayerTable;