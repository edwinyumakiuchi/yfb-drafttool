import React, { useState, useEffect, useRef } from 'react';
import cheerio from 'cheerio';
import fetch from 'isomorphic-fetch';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedValueIndex, setSelectedValueIndex] = useState(-1);
  const inputRef = useRef(null);

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
