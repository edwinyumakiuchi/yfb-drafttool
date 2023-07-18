export function handleInputChange(e, setInputValue, players, setMatchedValues, setSelectedValueIndex) {
  const value = e.target.value;
  setInputValue(value);

  // Filter the matched values based on the input value
  const filteredValues = players.filter((player) =>
    player.name.toLowerCase().includes(value.toLowerCase())
  );
  setMatchedValues(filteredValues);
  setSelectedValueIndex(-1); // Reset the selected value index
}

export function handleKeyDown(e, setSelectedValueIndex, matchedValues, selectedValueIndex, setInputValue, setMatchedValues) {
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
      setInputValue(selectedValue.name);
      setMatchedValues([]);
    }
  }
}

export function handleSort(field, sortField, setSortOrder, setSortField) {
  if (sortField === field) {
    // Toggle the sort order if the same field is clicked
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  } else {
    // Set the new field as the sort field and default to ascending order
    setSortField(field);
    setSortOrder('asc');
  }
}
