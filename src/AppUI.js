import React from 'react';
import PlayerRow from './row/PlayerRow';
import SelectedPlayerRow from './row/SelectedPlayerRow';

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
  leagueAverages
}) {
  return (
    <>
      {inputValue && matchedValues.length > 0 && (
        <PlayerRow
          matchedValues={matchedValues}
          selectedValueIndex={selectedValueIndex}
        />
      )}
      <br />
      {selectedPlayers && (
        <SelectedPlayerRow
          selectedPlayers={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          leagueAverages={leagueAverages}
        />
      )}
    </>
  );
}

export default AppUI;
