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
  return (
    <>
      {matchedValues.length > 0 && (
        <div>
          <p>Matched values:</p>
          <table className="bordered-table">
            <thead>
              <tr>
                <th className="centered">Player</th>
              </tr>
            </thead>
            <tbody>
              {matchedValues.map((value, index) => (
                <tr key={index} className={index === selectedValueIndex ? 'selected' : ''}>
                  <td className="centered">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p>Entered value: {inputValue}</p>
    </>
  );
}

export default AppUI;
