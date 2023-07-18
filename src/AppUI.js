import React from 'react';
import PlayerRow from './PlayerRow';
import SelectedPlayerRow from './SelectedPlayerRow';

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
  const selectedPlayer = players.find((player) => player.name === inputValue);
  return (
    <>
      {inputValue && matchedValues.length > 0 && (
        <PlayerRow
          matchedValues={matchedValues}
          selectedValueIndex={selectedValueIndex}
          handleSort={handleSort}
          sortField={sortField}
        />
      )}
      {selectedPlayer && <SelectedPlayerRow selectedPlayer={selectedPlayer} />}
    </>
  );
}

export default AppUI;
