export function handleInputChange(e, setInputValue, players, setMatchedPlayers, setSelectedPlayerIndex, selectedPlayers) {
  const value = e.target.value;
  setInputValue(value);

  // Filter the matched values based on the input value
  const filteredValues = players.filter((player) =>
    player.name.toLowerCase().includes(value.toLowerCase())
  );

  setMatchedPlayers(filteredValues);
  setSelectedPlayerIndex(-1); // Reset the selected value index
}

export function handleKeyDown(e, setSelectedPlayerIndex, matchedPlayers, selectedPlayerIndex, setInputValue,
  setMatchedPlayers, selectedPlayers, setSelectedPlayers, playerID, setPlayerID) {

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    setSelectedPlayerIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : matchedPlayers.length - 1;
      return matchedPlayers[newIndex] ? newIndex : prevIndex;
    });
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    setSelectedPlayerIndex((prevIndex) => {
      const newIndex = prevIndex < matchedPlayers.length - 1 ? prevIndex + 1 : 0;
      return matchedPlayers[newIndex] ? newIndex : prevIndex;
    });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (selectedPlayerIndex !== -1) {
      const selectedPlayer = matchedPlayers[selectedPlayerIndex];

      // Generate a unique id for the selected player using the playerID state variable
      const newPlayerID = playerID + 1;

      // Store the selected player in selectedPlayers map with the new id
      setSelectedPlayers((prevSelectedPlayers) => ({
        ...prevSelectedPlayers,
        [newPlayerID]: {
          ...selectedPlayer,
          id: newPlayerID,
        },
      }));

      // Update the playerID state to increment for the next player
      setPlayerID(newPlayerID);
      setInputValue(selectedPlayer.name);
      setMatchedPlayers([]);
    }
  }
}