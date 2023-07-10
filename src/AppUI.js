import React from 'react';

function AppUI({
  inputValue,
  matchedValues,
  selectedValueIndex,
  setInputValue,
  setMatchedValues,
  setSelectedValueIndex,
  players
}) {
  return (
    <>
      {matchedValues.length > 0 && (
        <div>
          <p>Matched values:</p>
          <span>
            {matchedValues.map((value, index) => (
              <React.Fragment key={index}>
                <span className={index === selectedValueIndex ? 'selected' : ''}>{value}</span>
                {index !== matchedValues.length - 1 && <br />}
              </React.Fragment>
            ))}
          </span>
        </div>
      )}
      <p>Entered value: {inputValue}</p>
    </>
  );
}

export default AppUI;
