import React, { useState, useEffect, useRef } from 'react';
import AppUI from './AppUI';
import { useLogin, useGetPlayers, useGetAuctionValues } from './utils/APIUtils';
import { handleInputChange, handleKeyDown } from './utils/HandlerUtils';
import { calculateLeagueAverages, countPositions } from './utils/LeagueUtils';

function App() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [matchedPlayers, setMatchedPlayers] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(-1);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [playerID, setPlayerID] = useState(0);

  const accessToken = useLogin();
  const players = useGetPlayers(accessToken);
  const auctionPlayers = useGetAuctionValues(accessToken);

  // Step 1: Sort auctionPlayers based on yahooAvg in descending order
  if (auctionPlayers) {
    // Convert yahooAvg to numerical value before sorting, handle the dollar sign if present
    auctionPlayers.forEach((player) => {
      // console.log("player.yahooAvg: " + player.yahooAvg)
      if (typeof player.yahooAvg === 'string' && player.yahooAvg.startsWith('$')) {
        player.yahooAvg = parseFloat(player.yahooAvg.slice(1)); // Remove the dollar sign and convert to number
      } else {
        player.yahooAvg = parseFloat(player.yahooAvg); // Convert to number directly (in case it's already a number or doesn't start with '$')
      }

      // Remove the yahooAvg if it's NaN
      if (isNaN(player.yahooAvg) || player.yahooAvg === undefined) {
        player.yahooAvg = 1;
      }
    });

    // Now sort based on numerical yahooAvg
    auctionPlayers.sort((a, b) => b.yahooAvg - a.yahooAvg);
  }

  // Step 2: Assign auctionValue to each player in the players array
  if (players && auctionPlayers) {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (auctionPlayers[i]) {
        player.auctionValue = auctionPlayers[i].yahooAvg;
      } else {
        // Handle the case when there are more players than auctionPlayers
        player.auctionValue = 0;
      }
      // console.log(`player.name: ${player.name}, auctionValue: $${player.auctionValue}`);
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (players.length > 0) {
      setMatchedPlayers(players);
    }
  }, [players]);

  // Calculate the league averages
  const leagueAverages = calculateLeagueAverages(players);

  Object.entries(leagueAverages).forEach(([field, sum]) => {
    leagueAverages[field] = sum / players.length;
  });

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
              setMatchedPlayers,
              setSelectedPlayerIndex
            )
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              setSelectedPlayerIndex,
              matchedPlayers,
              selectedPlayerIndex,
              setInputValue,
              setMatchedPlayers,
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
        {/* TODO: add another table that lists the number of players from each team */}
        <div className="left-tables-container">
          <AppUI
            inputValue={inputValue}
            matchedPlayers={matchedPlayers}
            selectedPlayerIndex={selectedPlayerIndex}
            setInputValue={setInputValue}
            players={players}
            selectedPlayers={selectedPlayers}
            leagueAverages={leagueAverages}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
