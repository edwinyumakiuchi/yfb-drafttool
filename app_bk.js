const cheerio = require('cheerio');
const express = require('express');
require('isomorphic-fetch');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fetch('https://hashtagbasketball.com/fantasy-basketball-projections')
        .then(response => response.text())
        .then(html => {
            const $ = cheerio.load(html);

            const players = [];

            $('#ContentPlaceHolder1_GridView1 tr:has(td)').each((index, element) => {
                const playerNameElement = $(element).find('a');
                const playerName = playerNameElement.text().trim();

                const lfgpElement = $(element).find('td:eq(6)');
                const lfgpValue = lfgpElement.text().trim();

                players.push({
                    name: playerName,
                    lfgp: lfgpValue,
                    id: index
                });
            });

            res.send(`
                <html>
                    <head>
                        <style>
                            ul {
                                list-style-type: none;
                            }

                            #playerDropdown {
                                padding: 0;
                            }

                            #playerDropdown > div {
                                padding: 5px;
                                cursor: pointer;
                                list-style-type: none;
                            }

                            #playerDropdown > div::marker {
                                display: none;
                            }

                            #playerDropdown > div:hover,
                            #playerDropdown > div.selected {
                                background-color: lightgray;
                            }
                        </style>
                    </head>
                    <body>
                        <input type="text" id="playerInput">
                        <div id="playerDropdown"></div>

                        <script>
                            const input = document.getElementById('playerInput');
                            const dropdown = document.getElementById('playerDropdown');
                            const options = ${JSON.stringify(players)};
                            let selectedIndex = -1;

                            input.addEventListener('input', function() {
                                const inputValue = input.value.toLowerCase();
                                const filteredOptions = options
                                    .filter(option => option.name.toLowerCase().includes(inputValue))
                                    .sort((a, b) => a.name.localeCompare(b.name));

                                dropdown.innerHTML = '';
                                selectedIndex = -1;

                                filteredOptions.forEach((option, index) => {
                                    const optionElement = document.createElement('div');
                                    optionElement.textContent = option.name;
                                    optionElement.addEventListener('click', function() {
                                        input.value = option.name;
                                        dropdown.innerHTML = '';
                                        const playerLFGPElement = document.getElementById('lfgp');
                                        if (playerLFGPElement) {
                                            playerLFGPElement.textContent = option.lfgp;
                                        }
                                    });
                                    dropdown.appendChild(optionElement);
                                });
                            });

                            input.addEventListener('keydown', function(e) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    const selectedOption = dropdown.querySelector('.selected');
                                    if (selectedOption) {
                                        input.value = selectedOption.textContent;
                                        dropdown.innerHTML = '';
                                        const selectedIndex = Array.from(dropdown.children).indexOf(selectedOption);
                                        const selectedPlayer = options[selectedIndex];
                                        const playerLFGPElement = document.getElementById('lfgp');
                                        if (playerLFGPElement) {
                                            playerLFGPElement.textContent = selectedPlayer.lfgp;
                                        }
                                    }
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    selectedIndex = Math.max(selectedIndex - 1, 0);
                                    updateSelectedOption();
                                } else if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    selectedIndex = Math.min(selectedIndex + 1, dropdown.children.length - 1);
                                    updateSelectedOption();
                                }
                            });

                            function updateSelectedOption() {
                                const options = Array.from(dropdown.children);
                                for (let i = 0; i < options.length; i++) {
                                    const option = options[i];
                                    if (i === selectedIndex) {
                                        option.classList.add('selected');
                                    } else {
                                        option.classList.remove('selected');
                                    }
                                }
                            }
                        </script>
                    </body>
                </html>
            `);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).send('An error occurred');
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
