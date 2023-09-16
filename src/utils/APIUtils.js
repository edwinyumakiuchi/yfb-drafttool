import { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import secretConfig from './../configs/SecretConfigs';

export function useLogin() {
  const [accessToken, setAccessToken] = useState('');
  useEffect(() => {
    fetch('https://realm.mongodb.com/api/client/v2.0/app/data-natmv/auth/providers/local-userpass/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: secretConfig.mongoUsername,
        password: secretConfig.mongoPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setAccessToken(data.access_token);
        } else {
          console.error('Access token not found in response');
        }
      })
      .catch((error) => {
        console.error('Login API call error:', error);
      });
  }, []);
  return accessToken;
}

export function useGetPlayers(accessToken, collection) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    if (accessToken) {
      fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          dataSource: 'Cluster0',
          database: 'sample-nba',
          collection: collection,
          filter: {},
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.documents && Array.isArray(data.documents)) {
            const fetchedPlayers = data.documents.map((player) => {
              return {
                _id: player._id,
                name: player.name,
                originalRank: player.rank,
                position: player.position,
                team: player.team,
                gp: player.gp,
                ...(collection === "projections"
                  ? {
                      adp: player.adp,
                      minutesPerGame: player.minutesPerGame,
                      fieldGoal: player.fieldGoal,
                      fieldGoalMade: player.fieldGoalMadeCalculated,
                      fieldGoalAttempt: player.fieldGoalAttempt,
                      fieldGoalClass: player.fieldGoalClass,
                      freeThrow: player.freeThrow,
                      freeThrowMade: player.freeThrowMadeCalculated,
                      freeThrowAttempt: player.freeThrowAttempt,
                      freeThrowClass: player.freeThrowClass,
                      threePointMade: player.threePointMade,
                      points: player.points,
                      totalRebounds: player.totalRebounds,
                      assists: player.assists,
                      steals: player.steals,
                      blocks: player.blocks,
                      turnovers: player.turnovers,
                      total: player.total
                    }
                  : {
                      yahooAvg: player.yahooAvg,
                      goftBid: player.goftBid
                    }),
              };
            });
            setPlayers(fetchedPlayers);
          } else {
            console.error('Invalid data format');
          }
        })
        .catch((error) => {
          console.error('API call error:', error);
        });
    }
  }, [accessToken]);
  return players;
}