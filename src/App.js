import React, { useState, useEffect } from 'react';
import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('https://hashtagbasketball.com/fantasy-basketball-projections')
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html);

        const fetchedPlayers = [];

        $('#ContentPlaceHolder1_GridView1 tr:has(td)').each((index, element) => {
          const playerNameElement = $(element).find('a');
          const playerName = playerNameElement.text().trim();

          const lfgpElement = $(element).find('td:eq(6)');
          const lfgpValue = lfgpElement.text().trim();

          fetchedPlayers.push({
            name: playerName,
            lfgp: lfgpValue,
            id: index,
          });
        });

        setPlayers(fetchedPlayers);
      });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the matched values based on the input value
    const filteredValues = players
      .map((player) => player.name)
      .filter((item) => item.toLowerCase().startsWith(value.toLowerCase()));
    setMatchedValues(filteredValues);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text"
        />
        <p>You entered: {inputValue}</p>
        {matchedValues.length > 0 && (
          <div>
            <p>Matched values:</p>
            <span>
              {matchedValues.map((value, index) => (
                <React.Fragment key={index}>
                  {value}
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