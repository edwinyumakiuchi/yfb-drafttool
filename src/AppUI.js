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
  selectedPlayers,
  setSelectedPlayers,
  handleKeyDown,
  handleSort,
  sortField,
  sortOrder
}) {
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
      {selectedPlayers && (
        <SelectedPlayerRow
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
        />
      )}
    </>
  );
}

export default AppUI;
