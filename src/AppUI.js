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
  const handleSelectPlayer = (player) => {
    setSelectedPlayers((prevSelectedPlayers) => ({
      ...prevSelectedPlayers,
      [player.id]: player,
    }));
    setInputValue(player.name);
    setMatchedValues([]);
  };
  // console.log(`selectedPlayers: ${selectedPlayers}`);

  return (
    <>
      {matchedValues.length > 0 && (
        <PlayerRow
          matchedValues={matchedValues}
          selectedValueIndex={selectedValueIndex}
          handleSort={handleSort}
          sortField={sortField}
          handleSelectPlayer={handleSelectPlayer}
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
