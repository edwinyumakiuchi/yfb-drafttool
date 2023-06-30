import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [matchedValues, setMatchedValues] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the matched values based on the input value
    const filteredValues = ['abc', 'acd', 'bcd', 'cdf'].filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
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
