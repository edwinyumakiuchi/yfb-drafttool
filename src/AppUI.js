import React from 'react';
import PlayerTable from './PlayerTable';

function AppUI({
  inputValue,
  matchedPlayers,
  selectedPlayerIndex,
  setInputValue,
  setSelectedPlayerIndex,
  players,
  selectedPlayers,
  setSelectedPlayers,
  handleKeyDown,
  leagueAverages
}) {
  return (
    <>
      {inputValue && matchedPlayers.length > 0 && (
        <PlayerTable
          matchedPlayers={matchedPlayers}
          selectedPlayers={null}
          selectedPlayerIndex={selectedPlayerIndex}
          leagueAverages={leagueAverages}
          isSelectedPlayerTable={false}
        />
      )}
      <br />
      {selectedPlayers && (
        <PlayerTable
          matchedPlayers={null}
          selectedPlayers={selectedPlayers}
          selectedPlayerIndex={null}
          leagueAverages={leagueAverages}
          isSelectedPlayerTable={true}
        />
      )}
      <br/>
      <PlayerTable
        matchedPlayers={players}
        selectedPlayers={null}
        selectedPlayerIndex={-1}
        leagueAverages={leagueAverages}
        isSelectedPlayerTable={false}
      />
    </>
  );
}

export default AppUI;
