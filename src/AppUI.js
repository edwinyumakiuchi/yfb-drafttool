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
  const playerRows = matchedValues.map((player, index) => (
    <tr key={index} className={index === selectedValueIndex ? 'selected' : ''}>
      <td className="centered">{player.name}</td>
      <td className="centered">{player.team}</td>
    </tr>
  ));

  const selectedPlayer = players.find((player) => player.name === inputValue);

  return (
    <>
      {matchedValues.length > 0 && (
        <div>
          <p>Matched values:</p>
          <table className="bordered-table">
            <thead>
              <tr>
                <th className="centered">Player</th>
                <th className="centered">Team</th>
              </tr>
            </thead>
            <tbody>{playerRows}</tbody>
          </table>
        </div>
      )}
      {selectedPlayer && (
        <div>
          <p>Entered value:</p>
          <table className="bordered-table">
            <thead>
              <tr>
                <th className="centered">Player</th>
                <th className="centered">Team</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="centered">{selectedPlayer.name}</td>
                <td className="centered">{selectedPlayer.team}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AppUI;
