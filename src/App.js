import React, { useState, useEffect, useRef } from 'react';
import AppUI from './AppUI';
import { useLogin, useGetPlayers } from './utils/APIUtils';
import { handleInputChange, handleKeyDown } from './utils/HandlerUtils';
import { calculateLeagueAverages, countPositions } from './utils/LeagueUtils';
import { sortAuctionPlayers, assignAuctionValues } from './utils/AuctionUtils';

function App() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [matchedPlayers, setMatchedPlayers] = useState([]);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(-1);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const [playerID, setPlayerID] = useState(0);

  const accessToken = useLogin();
  const players = useGetPlayers(accessToken, "projections");
  const auctionPlayers = useGetPlayers(accessToken, "auction-values");

  // Step 1: Sort auctionPlayers based on yahooAvg in descending order
  sortAuctionPlayers(auctionPlayers);

  // Step 2: Assign auctionValue to each player in the players array
  assignAuctionValues(players, auctionPlayers);

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
