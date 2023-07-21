export function handleInputChange(e, setInputValue, players, setMatchedValues, setSelectedValueIndex, selectedPlayers) {
  const value = e.target.value;
  setInputValue(value);

  // Filter the matched values based on the input value
  const filteredValues = players.filter((player) =>
    player.name.toLowerCase().includes(value.toLowerCase())
  );

  setMatchedValues(filteredValues);
  setSelectedValueIndex(-1); // Reset the selected value index
}

export function handleKeyDown(e, setSelectedValueIndex, matchedValues, selectedValueIndex, setInputValue,
  setMatchedValues, selectedPlayers, setSelectedPlayers, playerID, setPlayerID) {

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    setSelectedValueIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : matchedValues.length - 1;
      return matchedValues[newIndex] ? newIndex : prevIndex;
    });
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    setSelectedValueIndex((prevIndex) => {
      const newIndex = prevIndex < matchedValues.length - 1 ? prevIndex + 1 : 0;
      return matchedValues[newIndex] ? newIndex : prevIndex;
    });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (selectedValueIndex !== -1) {
      const selectedValue = matchedValues[selectedValueIndex];

      // Generate a unique id for the selected player using the playerID state variable
      const newPlayerID = playerID + 1;

      // Store the selected player in selectedPlayers map with the new id
      setSelectedPlayers((prevSelectedPlayers) => ({
        ...prevSelectedPlayers,
        [newPlayerID]: {
          ...selectedValue,
          id: newPlayerID,
        },
      }));

      // Update the playerID state to increment for the next player
      setPlayerID(newPlayerID);
      setInputValue(selectedValue.name);
      setMatchedValues([]);
    }
  }
}