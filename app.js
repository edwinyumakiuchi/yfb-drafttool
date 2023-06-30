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

                            #playerDropdown > div:hover {
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

                            input.addEventListener('input', function() {
                                const inputValue = input.value.toLowerCase();
                                const filteredOptions = new Set();

                                options.forEach(option => {
                                    const optionValue = option.toLowerCase();
                                    if (optionValue.includes(inputValue)) {
                                        filteredOptions.add(option);
                                    }
                                });

                                dropdown.innerHTML = ''; // Clear previous options

                                filteredOptions.forEach(option => {
                                    const optionElement = document.createElement('div');
                                    optionElement.textContent = option;
                                    optionElement.addEventListener('click', function() {
                                        input.value = option;
                                        dropdown.innerHTML = '';
                                    });
                                    dropdown.appendChild(optionElement);
                                });
                            });
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
