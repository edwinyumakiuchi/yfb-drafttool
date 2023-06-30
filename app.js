const cheerio = require('cheerio');
const express = require('express');
require('isomorphic-fetch');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fetch('https://hashtagbasketball.com/fantasy-basketball-projections')
        .then(response => response.text()) // Fetch the HTML content as text
        .then(html => {
            const $ = cheerio.load(html); // Load the HTML content using Cheerio

            const players = []; // Array to store the players

            for (let i = 0; i <= 199; i++) {
                const playerId = `#ContentPlaceHolder1_GridView1_HyperLink1_${i}`;
                const playerNameElement = $(playerId);
                const playerName = playerNameElement.text().trim();

                players.push(playerName);
            }

            // Render the HTML page with the textbox
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
                                list-style-type: none; /* Add this line to remove bullet points */
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
                                const filteredOptions = options.filter(option => option.toLowerCase().includes(inputValue));

                                dropdown.innerHTML = ''; // Clear previous options
                                selectedIndex = -1;

                                filteredOptions.forEach((option, index) => {
                                    const optionElement = document.createElement('div');
                                    optionElement.textContent = option;
                                    optionElement.addEventListener('click', function() {
                                        input.value = option;
                                        dropdown.innerHTML = '';
                                    });
                                    dropdown.appendChild(optionElement);
                                });
                            });

                            input.addEventListener('keydown', function(e) {
                                if (e.keyCode === 13) {
                                    e.preventDefault(); // Prevent form submission
                                    if (selectedIndex >= 0 && selectedIndex < dropdown.children.length) {
                                        const selectedOption = dropdown.children[selectedIndex];
                                        input.value = selectedOption.textContent;
                                        dropdown.innerHTML = '';
                                    }
                                } else if (e.keyCode === 38) {
                                    e.preventDefault(); // Prevent scrolling
                                    selectedIndex = Math.max(selectedIndex - 1, 0);
                                    updateSelectedOption();
                                } else if (e.keyCode === 40) {
                                    e.preventDefault(); // Prevent scrolling
                                    selectedIndex = Math.min(selectedIndex + 1, dropdown.children.length - 1);
                                    updateSelectedOption();
                                }
                            });

                            function updateSelectedOption() {
                                for (let i = 0; i < dropdown.children.length; i++) {
                                    const option = dropdown.children[i];
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
