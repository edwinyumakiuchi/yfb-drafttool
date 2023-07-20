import React, { useState, useEffect, useRef } from 'react';
import AppUI from './AppUI';
import PlayerRow from './PlayerRow';
import { useLogin, useGetPlayers } from './api';
import { handleInputChange, handleKeyDown, arraysAreEqual } from './AppHandlers';

function App() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [selectedValueIndex, setSelectedValueIndex] = useState(-1);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [playerID, setPlayerID] = useState(0);

  const accessToken = useLogin();
  const players = useGetPlayers(accessToken);

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
  // following commit comments out the sorting functionality
  // https://github.com/edwinyumakiuchi/yfb-drafttool/commit/8cf9934c342aa8b141c2b37e9e4e371feb6329a1
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
            leagueAverages={leagueAverages}
          />
          <br />
          <br />
          <br />
          <PlayerRow
            matchedValues={players}
            selectedValueIndex={-1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
