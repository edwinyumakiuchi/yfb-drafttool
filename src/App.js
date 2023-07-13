import React, { useState, useEffect, useRef } from 'react';
import AppUI from './AppUI';
import PlayerRow from './PlayerRow';
import { login, getPlayers } from './api';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedValueIndex, setSelectedValueIndex] = useState(-1);
  const [accessToken, setAccessToken] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const inputRef = useRef(null);

  useEffect(() => {
    login((error, token) => {
      if (error) {
        console.error('Login API call error:', error);
      } else {
        setAccessToken(token);
      }
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      getPlayers(accessToken, (error, fetchedPlayers) => {
        if (error) {
          console.error('API call error:', error);
        } else {
          setPlayers(fetchedPlayers);
        }
      });
    }
  }, [accessToken]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the matched values based on the input value
    const filteredValues = players.filter((player) =>
      player.name.toLowerCase().includes(value.toLowerCase())
    );
    setMatchedValues(filteredValues);
    setSelectedValueIndex(-1); // Reset the selected value index
  };

  const handleKeyDown = (e) => {
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
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle the sort order if the same field is clicked
      setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set the new field as the sort field and default to ascending order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const sortedValues = [...matchedValues].sort((a, b) => {
      const valueA = parseFloat(a[sortField]) || 0;
      const valueB = parseFloat(b[sortField]) || 0;

      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

    setMatchedValues(sortedValues);
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

  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
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
        handleKeyDown={handleKeyDown}
        handleSort={handleSort}
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
          handleSort={handleSort}
          sortField={sortField}
        />
      )}
    </div>
  );
}

export default App;
