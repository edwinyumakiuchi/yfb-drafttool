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

            // Render the HTML page with the text field and Awesomplete autocomplete
            res.send(`
                <html>
                    <body>
                        <input type="text" id="playerInput" autocomplete="off">

                        <script src="https://cdn.jsdelivr.net/npm/awesomplete@1.1.2/awesomplete.min.js"></script>
                        <script>
                            const input = document.getElementById('playerInput');
                            const options = ${JSON.stringify(players)};

                            new Awesomplete(input, {
                                list: options,
                                minChars: 1,
                                maxItems: 5,
                                autoFirst: true
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
