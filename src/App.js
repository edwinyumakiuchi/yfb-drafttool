import React, { useState, useEffect, useRef } from 'react';
import fetch from 'isomorphic-fetch';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedValueIndex, setSelectedValueIndex] = useState(-1);
  const [accessToken, setAccessToken] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Make the login API call to get the access token
    fetch('https://realm.mongodb.com/api/client/v2.0/app/data-natmv/auth/providers/local-userpass/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'edwinyumakiuchi@gmail.com',
        password: 'abc',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('login data:', data);
        if (data.access_token) {
          setAccessToken(data.access_token); // Store the access token
        } else {
          console.error('Access token not found in response:', data);
        }
      })
      .catch((error) => {
        console.error('Login API call error:', error);
      });
  }, []);

  useEffect(() => {
    if (accessToken) {
      // Make the data fetch API call using the access token
      fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'sample-nba',
          collection: 'projections',
          filter: {},
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          if (data.documents && Array.isArray(data.documents)) {
            const fetchedPlayers = data.documents.map((player) => ({
              _id: player._id,
              name: player.name,
              rank: player.rank,
              adp: player.adp,
              position: player.position,
              team: player.team,
              gp: player.gp,
              minutesPerGame: player.minutesPerGame,
              fieldGoal: player.fieldGoal,
              fieldGoalMade: player.fieldGoalMade,
              fieldGoalAttempt: player.fieldGoalAttempt,
              freeThrow: player.freeThrow,
              freeThrowMade: player.freeThrowMade,
              freeThrowAttempt: player.freeThrowAttempt,
              threePointMade: player.threePointMade,
              points: player.points,
              totalRebounds: player.totalRebounds,
              assists: player.assists,
              steals: player.steals,
              blocks: player.blocks,
              turnovers: player.turnovers,
              total: player.total,
            }));
            setPlayers(fetchedPlayers);
          } else {
            console.error('Invalid data format:', data);
          }
        })
        .catch((error) => {
          console.error('API call error:', error);
        });
    }
  }, [accessToken]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the matched values based on the input value
    const filteredValues = players
      .map((player) => player.name)
      .filter((item) => item.toLowerCase().startsWith(value.toLowerCase()));
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
        setInputValue(selectedValue);
        setMatchedValues([]);
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      <style>
        {`
        .selected {
          background-color: yellow;
        }
      `}
      </style>
      <header className="App-header">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter text"
          ref={inputRef}
        />
        <p>You entered: {inputValue}</p>
        {matchedValues.length > 0 && (
          <div>
            <p>Matched values:</p>
            <span>
              {matchedValues.map((value, index) => (
                <React.Fragment key={index}>
                  <span
                    className={index === selectedValueIndex ? 'selected' : ''}
                  >
                    {value}
                  </span>
                  {index !== matchedValues.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
