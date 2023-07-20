function getFieldGoalClass(fieldGoalMade, fieldGoalAttempt, leagueAverages) {
  if (!fieldGoalMade || !fieldGoalAttempt) return;

  const leagueFieldGoalPercentage = (leagueAverages.fieldGoal + (leagueAverages.fieldGoalMade / leagueAverages.fieldGoalAttempt))/2;
  const playerFieldGoalPercentage = fieldGoalMade / fieldGoalAttempt;
  const value = (playerFieldGoalPercentage - leagueFieldGoalPercentage) * (fieldGoalAttempt / leagueAverages.fieldGoalAttempt);

  switch (true) {
    case value >= 0.075:
      return 'bold centered dark-green';
    case value >= 0.03 && value < 0.075:
      return 'bold centered green';
    case value >= 0 && value < 0.03:
      return 'bold centered light-green';
    case value >= -0.05 && value < -0.02:
      return 'bold centered light-red';
    case value < -0.05:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getFreeThrowClass(freeThrowMade, freeThrowAttempt, leagueAverages) {
  if (!freeThrowMade || !freeThrowAttempt) return;

  const leagueFreeThrowPercentage = (leagueAverages.freeThrow + (leagueAverages.freeThrowMade / leagueAverages.freeThrowAttempt))/2;
  const playerFreeThrowPercentage = freeThrowMade / freeThrowAttempt;
  const value = (playerFreeThrowPercentage - leagueFreeThrowPercentage) * (freeThrowAttempt / leagueAverages.freeThrowAttempt);

  switch (true) {
    case value >= 0.15:
      return 'bold centered dark-green';
    case value >= 0.08 && value < 0.15:
      return 'bold centered green';
    case value >= 0.03 && value < 0.08:
      return 'bold centered light-green';
    case value >= -0.0425 && value < -0.00875:
      return 'bold centered light-red';
    case value < -0.0425:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getThreePointMadeClass(value) {
  if (!value) return;

  switch (true) {
    case value >= 4:
      return 'bold centered dark-green';
    case value >= 3 && value < 4:
      return 'bold centered green';
    case value >= 2 && value < 3:
      return 'bold centered light-green';
    case value >= 1 && value < 1.5:
      return 'bold centered light-red';
    case value < 1:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getPointClass(value) {
  if (!value) return;

  switch (true) {
    case value >= 30:
      return 'bold centered dark-green';
    case value >= 25 && value < 30:
      return 'bold centered green';
    case value >= 20 && value < 25:
      return 'bold centered light-green';
    case value >= 10 && value < 15:
      return 'bold centered light-red';
    case value < 10:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getReboundClass(value) {
  if (!value) return;

  switch (true) {
    case value >= 10:
      return 'bold centered dark-green';
    case value >= 9 && value < 10:
      return 'bold centered green';
    case value >= 7 && value < 9:
      return 'bold centered light-green';
    case value >= 3 && value < 5:
      return 'bold centered light-red';
    case value < 3:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getAssistClass(value) {
  if (!value) return;

  switch (true) {
    case value >= 8:
      return 'bold centered dark-green';
    case value >= 6 && value < 8:
      return 'bold centered green';
    case value >= 4 && value < 6:
      return 'bold centered light-green';
    case value >= 1 && value < 2:
      return 'bold centered light-red';
    case value < 1:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getStealClass(value) {
  if (!value) return;

  switch (true) {
    case value >= 2:
      return 'bold centered dark-green';
    case value >= 1.5 && value < 2:
      return 'bold centered green';
    case value >= 1 && value < 1.5:
      return 'bold centered light-green';
    case value >= 0.5 && value < 0.7:
      return 'bold centered light-red';
    case value < 0.5:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getBlockClass(value) {
  if (!value) return;

  switch (true) {
    case value >= 1.5:
      return 'bold centered dark-green';
    case value >= 1.2 && value < 1.5:
      return 'bold centered green';
    case value >= 0.8 && value < 1.2:
      return 'bold centered light-green';
    case value >= 0.3 && value < 0.5:
      return 'bold centered light-red';
    case value < 0.3:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getTurnoverClass(value) {
  if (!value) return;

  switch (true) {
    case value <= 0.7:
      return 'bold centered dark-green';
    case value <= 1 && value > 0.7:
      return 'bold centered green';
    case value <= 1.5 && value > 1:
      return 'bold centered light-green';
    case value < 3 && value >= 2:
      return 'bold centered light-red';
    case value >= 3:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

export {
  getFieldGoalClass,
  getFreeThrowClass,
  getThreePointMadeClass,
  getPointClass,
  getReboundClass,
  getAssistClass,
  getStealClass,
  getBlockClass,
  getTurnoverClass
};
