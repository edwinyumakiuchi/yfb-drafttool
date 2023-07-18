import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    fetch('https://hashtagbasketball.com/fantasy-basketball-projections')
      .then(response => response.text())
      .then(html => {
        const playerList = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('#ContentPlaceHolder1_GridView1 tr:has(td)');

        rows.forEach((row, index) => {
          const playerNameElement = row.querySelector('a');
          const playerName = playerNameElement.textContent.trim();

          const lfgpElement = row.querySelector('td:nth-child(6)');
          const lfgpValue = lfgpElement.textContent.trim();

          playerList.push({
            name: playerName,
            lfgp: lfgpValue,
            id: index,
          });
        });

        setPlayers(playerList);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleInputChange = (inputValue) => {
    const filteredOptions = players
      .filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));

    setFilteredOptions(filteredOptions);
    setSelectedIndex(-1);
  };

  const handleOptionPress = (option) => {
    setSelectedPlayer(option);
    setFilteredOptions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const selectedOption = filteredOptions[selectedIndex];
      if (selectedOption) {
        setSelectedPlayer(selectedOption);
        setFilteredOptions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(Math.max(selectedIndex - 1, 0));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(Math.min(selectedIndex + 1, filteredOptions.length - 1));
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
        onChangeText={handleInputChange} // Fix: Pass the text directly
      />
      <View>
        {filteredOptions.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={{ padding: 5, backgroundColor: selectedIndex === index ? 'lightgray' : 'white' }}
            onPress={() => handleOptionPress(option)}
          >
            <Text>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedPlayer && <Text id="lfgp">{selectedPlayer.lfgp}</Text>}
    </View>
  );
};

export default App;
