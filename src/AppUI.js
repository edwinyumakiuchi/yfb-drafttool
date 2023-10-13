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
  highlightedPlayer,
  handleSort }) {

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
          handleSort={null}
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
          handleSort={null}
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
        handleSort={handleSort}
      />
    </>
  );
}

export default AppUI;
