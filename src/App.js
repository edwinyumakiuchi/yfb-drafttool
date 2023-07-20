import React, { useState, useEffect, useRef } from 'react';
import AppUI from './AppUI';
import PlayerRow from './PlayerRow';
import { useLogin, useGetPlayers } from './api';
// import { handleInputChange, handleKeyDown, handleSort, arraysAreEqual } from './AppHandlers';
import { handleInputChange, handleKeyDown, arraysAreEqual } from './AppHandlers';

function App() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [selectedValueIndex, setSelectedValueIndex] = useState(-1);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [playerID, setPlayerID] = useState(0);
  /* const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); */

  const accessToken = useLogin();
  const players = useGetPlayers(accessToken);

  /* useEffect(() => {
    const sortedValues = [...matchedValues].sort((a, b) => {
      const valueA = parseFloat(a[sortField]) || 0;
      const valueB = parseFloat(b[sortField]) || 0;
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

    if (!arraysAreEqual(sortedValues, matchedValues)) {
      setMatchedValues(sortedValues);
    }
  }, [sortField, sortOrder, matchedValues]); */

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

  // Calculate the league averages
  const leagueAverages = players.reduce((averages, player) => {
    Object.entries(player).forEach(([field, value]) => {
      if (field !== 'id' && !isNaN(parseFloat(value))) {
        averages[field] = (averages[field] || 0) + parseFloat(value);
      }
    });
    return averages;
  }, {});

  Object.entries(leagueAverages).forEach(([field, sum]) => {
    leagueAverages[field] = sum / players.length;
  });

  function countPositions(selectedPlayers) {
    const positions = ['PG', 'SG', 'SF', 'PF', 'C'];
    const positionCounts = positions.reduce((acc, position) => {
      acc[position] = 0;
      return acc;
    }, {});

    Object.values(selectedPlayers).forEach((selectedPlayer) => {
      const playerPositions = selectedPlayer.position.split(',').map((pos) => pos.trim());
      playerPositions.forEach((position) => {
        if (positionCounts.hasOwnProperty(position)) {
          positionCounts[position]++;
        }
      });
    });

    return positionCounts;
  }

  const positionCounts = countPositions(selectedPlayers);
  const positions = ['PG', 'SG', 'SF', 'PF', 'C'];

  // TODO: fix sorting functionality
  // this commit seems to break the sorting functionality
  // https://github.com/edwinyumakiuchi/yfb-drafttool/commit/bbc37864fb9ebbd034384fcda7bef6b5c8b95cfd
  // however this is also required so selected players are stored properly
  return (
    <div className="app-container">
      <div className="input-table-container">
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
              setSelectedPlayers,
              playerID,
              setPlayerID
            )
          }
          placeholder="Enter text"
          ref={inputRef}
          style={{ width: '150px', height: '30px' }}
        />
        <table className="bordered-table" style={{ width: '500px' }}>
          <tbody>
            <tr>
              {positions.map((position) => (
                <td key={position} className="bold centered">{position}</td>
              ))}
            </tr>
            <tr>
              {positions.map((position) => (
                <td key={position} className="bold centered">{positionCounts[position]}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="left-tables-container">
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
                setSelectedPlayers,
                playerID,
                setPlayerID
              )
            }
            /* handleSort={(field) => handleSort(field, sortField, setSortOrder, setSortField)}
            sortField={sortField}
            sortOrder={sortOrder} */
            leagueAverages={leagueAverages}
          />
          <br />
          <br />
          <br />
          <PlayerRow
            matchedValues={players}
            selectedValueIndex={-1}
            /* handleSort={(field) => handleSort(field, sortField, setSortOrder, setSortField)}
            sortField={sortField} */
          />
        </div>
      </div>
    </div>
  );
}

export default App;
