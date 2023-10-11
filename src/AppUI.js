import React from 'react';
import PlayerTable from './PlayerTable';

function AppUI({
  inputValue,
  matchedPlayers,
  selectedPlayerIndex,
  setInputValue,
  players,
  selectedPlayers,
  leagueAverages,
  auctionValues,
  addExtraRow,
  highlightedPlayer
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
          addExtraRow={false}
          highlightedPlayer={null}
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
          addExtraRow={addExtraRow}
          highlightedPlayer={highlightedPlayer}
        />
      )}
      <br/>
      <PlayerTable
        matchedPlayers={players}
        selectedPlayers={null}
        selectedPlayerIndex={-1}
        leagueAverages={leagueAverages}
        isSelectedPlayerTable={false}
        addExtraRow={false}
        highlightedPlayer={null}
      />
    </>
  );
}

export default AppUI;
