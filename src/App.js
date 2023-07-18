import React, { useState, useEffect, useRef } from 'react';
import AppUI from './AppUI';
import PlayerRow from './PlayerRow';
import { useLogin, useGetPlayers } from './api';
import { handleInputChange, handleKeyDown, handleSort, arraysAreEqual } from './AppHandlers';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [selectedValueIndex, setSelectedValueIndex] = useState(-1);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const inputRef = useRef(null);

  const accessToken = useLogin();
  const players = useGetPlayers(accessToken);

  useEffect(() => {
    const sortedValues = [...matchedValues].sort((a, b) => {
      const valueA = parseFloat(a[sortField]) || 0;
      const valueB = parseFloat(b[sortField]) || 0;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

    if (!arraysAreEqual(sortedValues, matchedValues)) {
      setMatchedValues(sortedValues);
    }
  }, [sortField, sortOrder, matchedValues]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      setMatchedValues(players);
    }
  }, [players]);

  // TODO: sorting functionality for unselected players
  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        onChange={(e) =>
          handleInputChange(
            e,
            setInputValue,
            players,
            setMatchedValues,
            setSelectedValueIndex
          )
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            setSelectedValueIndex,
            matchedValues,
            selectedValueIndex,
            setInputValue,
            setMatchedValues,
            selectedPlayers,
            setSelectedPlayers
          )
        }
        placeholder="Enter text"
        ref={inputRef}
      />
      <AppUI
        inputValue={inputValue}
        matchedValues={matchedValues}
        selectedValueIndex={selectedValueIndex}
        setInputValue={setInputValue}
        setMatchedValues={setMatchedValues}
        setSelectedValueIndex={setSelectedValueIndex}
        players={players}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
        handleKeyDown={(e) =>
          handleKeyDown(
            e,
            setSelectedValueIndex,
            matchedValues,
            selectedValueIndex,
            setInputValue,
            setMatchedValues,
            selectedPlayers,
            setSelectedPlayers
          )
        }
        handleSort={(field) => handleSort(field, sortField, setSortOrder, setSortField)}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      <br />
      <br />
      <br />
      {inputValue && (
        <PlayerRow
          matchedValues={players}
          selectedValueIndex={-1}
          handleSort={(field) => handleSort(field, sortField, setSortOrder, setSortField)}
          sortField={sortField}
        />
      )}
    </div>
  );
}

export default App;
