import fetch from 'isomorphic-fetch';
import secretConfig from './secretConfig';

export function login(callback) {
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
        callback(null, data.access_token);
      } else {
        callback(new Error('Access token not found in response'));
      }
    })
    .catch((error) => {
      callback(error);
    });
}

export function getPlayers(accessToken, callback) {
  fetch('https://us-west-2.aws.data.mongodb-api.com/app/data-natmv/endpoint/data/v1/action/find', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      dataSource: 'Cluster0',
      database: 'sample-nba',
      collection: 'projections',
      filter: {},
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.documents && Array.isArray(data.documents)) {
        const fetchedPlayers = data.documents.map((player) => ({
          _id: player._id,
          name: player.name,
          originalRank: player.rank,
          adp: player.adp,
          position: player.position,
          team: player.team,
          gp: player.gp,
          minutesPerGame: player.minutesPerGame,
          fieldGoal: player.fieldGoal,
          fieldGoalMade: player.fieldGoalMade,
          fieldGoalAttempt: player.fieldGoalAttempt,
          fieldGoalClass: player.fieldGoalClass,
          freeThrow: player.freeThrow,
          freeThrowMade: player.freeThrowMade,
          freeThrowAttempt: player.freeThrowAttempt,
          freeThrowClass: player.freeThrowClass,
          threePointMade: player.threePointMade,
          points: player.points,
          totalRebounds: player.totalRebounds,
          assists: player.assists,
          steals: player.steals,
          blocks: player.blocks,
          turnovers: player.turnovers,
          total: player.total,
        }));
        callback(null, fetchedPlayers);
      } else {
        callback(new Error('Invalid data format'));
      }
    })
    .catch((error) => {
      callback(error);
    });
}
