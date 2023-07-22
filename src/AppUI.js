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
          leagueAverages={leagueAverages}
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
      <PlayerRow
        matchedValues={players}
        selectedValueIndex={-1}
        leagueAverages={leagueAverages}
      />
    </>
  );
}

export default AppUI;
