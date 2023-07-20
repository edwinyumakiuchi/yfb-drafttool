import React from 'react';
import { getFieldGoalClass, getFreeThrowClass, getThreePointMadeClass, getPointClass, getReboundClass, getAssistClass,
         getStealClass, getBlockClass, getTurnoverClass } from './classHelper';

function SelectedPlayerRow({ selectedPlayers, setSelectedPlayers, leagueAverages }) {
  // Function to calculate column averages
  const calculateAverages = () => {
    const numPlayers = Object.values(selectedPlayers).length;
    const sum = (field) =>
      Object.values(selectedPlayers).reduce((acc, player) => {
        const fieldValue = parseFloat(player[field]); // Parse the field value as a float
        return isNaN(fieldValue) ? acc : acc + fieldValue; // Exclude NaN and add numeric values
      }, 0);

    const formatNumber = (num) => {
      const formattedNumber = Number(num.toFixed(4));
      return isNaN(formattedNumber) ? '' : formattedNumber.toString();
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

  const averages = calculateAverages();

  return (
    <>
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
            {Object.values(selectedPlayers).map((selectedPlayer) => (
              <tr key={selectedPlayer.id}>
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
                    selectedPlayer.fieldGoalClass === 'good' ? 'bold centered light-green' :
                    selectedPlayer.fieldGoalClass === 'bavg' ? 'bold centered light-red' :
                    selectedPlayer.fieldGoalClass === 'ngood' ? 'bold centered red' : 'bold centered'
                  }
                >
                  {selectedPlayer.fieldGoal} ({selectedPlayer.fieldGoalMade}/{selectedPlayer.fieldGoalAttempt})
                </td>
                <td
                  className={
                    selectedPlayer.freeThrowClass === 'elite' ? 'bold centered dark-green' :
                    selectedPlayer.freeThrowClass === 'vgood' ? 'bold centered green' :
                    selectedPlayer.freeThrowClass === 'good' ? 'bold centered light-green' :
                    selectedPlayer.freeThrowClass === 'bavg' ? 'bold centered light-red' :
                    selectedPlayer.freeThrowClass === 'ngood' ? 'bold centered red' : 'bold centered'
                  }
                >
                  {selectedPlayer.freeThrow} ({selectedPlayer.freeThrowMade}/{selectedPlayer.freeThrowAttempt})
                </td>
                <td className={getThreePointMadeClass(selectedPlayer.threePointMade)}>
                  {selectedPlayer.threePointMade}
                </td>
                <td className={getPointClass(selectedPlayer.points)}>
                  {selectedPlayer.points}
                </td>
                <td className={getReboundClass(selectedPlayer.totalRebounds)}>
                  {selectedPlayer.totalRebounds}
                </td>
                <td className={getAssistClass(selectedPlayer.assists)}>
                  {selectedPlayer.assists}
                </td>
                <td className={getStealClass(selectedPlayer.steals)}>
                  {selectedPlayer.steals}
                </td>
                <td className={getBlockClass(selectedPlayer.blocks)}>
                  {selectedPlayer.blocks}
                </td>
                <td className={getTurnoverClass(selectedPlayer.turnovers)}>
                  {selectedPlayer.turnovers}
                </td>
                <td className="bold centered">{selectedPlayer.total}</td>
              </tr>
            ))}
            {/* Render the row for averages */}
            <tr>
              <td className="bold centered">AVERAGE</td>
              <td className="bold centered"></td>
              <td className="bold centered"></td>
              <td className="bold centered"></td>
              {/* <td className="bold centered">
                {`PG=${positionCounts['PG']}`}<br />
                {`SG=${positionCounts['SG']}`}<br />
                {`SF=${positionCounts['SF']}`}<br />
                {`PF=${positionCounts['PF']}`}<br />
                {`C=${positionCounts['C']}`}
              </td> */}
              <td className="bold centered"></td>
              <td className="bold centered"></td>
              <td className="bold centered"></td>
              <td className="bold centered">
                {isNaN(averages.fieldGoalMade / averages.fieldGoalAttempt)
                  ? ''
                  : (averages.fieldGoalMade / averages.fieldGoalAttempt).toFixed(3)}
              </td>
              <td className="bold centered">{averages.fieldGoalMade}</td>
              <td className="bold centered">{averages.fieldGoalAttempt}</td>
              <td className="bold centered">
                {isNaN(averages.freeThrowMade / averages.freeThrowAttempt)
                  ? ''
                  : (averages.freeThrowMade / averages.freeThrowAttempt).toFixed(3)}
              </td>
              <td className="bold centered">{averages.freeThrowMade}</td>
              <td className="bold centered">{averages.freeThrowAttempt}</td>
              <td className={getFieldGoalClass(averages.fieldGoalMade, averages.fieldGoalAttempt, leagueAverages)}>
                {isNaN(averages.fieldGoalMade / averages.fieldGoalAttempt)
                  ? ''
                  : `${(averages.fieldGoalMade / averages.fieldGoalAttempt).toFixed(3)} (${averages.fieldGoalMade}/${averages.fieldGoalAttempt})`}
              </td>
              <td className={getFreeThrowClass(averages.freeThrowMade, averages.freeThrowAttempt, leagueAverages)}>
                {isNaN(averages.freeThrowMade / averages.freeThrowAttempt)
                  ? ''
                  : `${(averages.freeThrowMade / averages.freeThrowAttempt).toFixed(3)} (${averages.freeThrowMade}/${averages.freeThrowAttempt})`}
              </td>
              <td className={getThreePointMadeClass(averages.threePointMade)}>{averages.threePointMade}</td>
              <td className={getPointClass(averages.points)}>{averages.points}</td>
              <td className={getReboundClass(averages.totalRebounds)}>{averages.totalRebounds}</td>
              <td className={getAssistClass(averages.assists)}>{averages.assists}</td>
              <td className={getStealClass(averages.steals)}>{averages.steals}</td>
              <td className={getBlockClass(averages.blocks)}>{averages.blocks}</td>
              <td className={getTurnoverClass(averages.turnovers)}>{averages.turnovers}</td>
              <td className="bold centered"></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default SelectedPlayerRow;
