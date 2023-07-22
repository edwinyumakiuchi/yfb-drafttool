const configs = require('./../configs/ClassificationConfigs');

function getPercentageClassification(category, made, attempt, leagueAverages) {
  if (!made || !attempt) return;

  let leaguePercentage, leagueMade, leagueAttempt,
    eliteClassification, greatClassification, goodClassification, badClassification, horribleClassification;

  switch (category) {
    case 'fieldgoal':
      leaguePercentage = leagueAverages.fieldGoal;
      leagueMade = leagueAverages.fieldGoalMade;
      leagueAttempt = leagueAverages.fieldGoalAttempt;
      eliteClassification = configs.fieldgoal.eliteClassification;
      greatClassification = configs.fieldgoal.greatClassification;
      goodClassification = configs.fieldgoal.goodClassification;
      badClassification = configs.fieldgoal.badClassification;
      horribleClassification = configs.fieldgoal.horribleClassification;
      break;
    case 'freethrow':
      leaguePercentage = leagueAverages.freeThrow;
      leagueMade = leagueAverages.freeThrowMade;
      leagueAttempt = leagueAverages.freeThrowAttempt;
      eliteClassification = configs.freethrow.eliteClassification;
      greatClassification = configs.freethrow.greatClassification;
      goodClassification = configs.freethrow.goodClassification;
      badClassification = configs.freethrow.badClassification;
      horribleClassification = configs.freethrow.horribleClassification;
      break;
  }

  const leagueAveragePercentage = (leaguePercentage + (leagueMade / leagueAttempt))/2;
  const playerPercentage = made / attempt;
  const value = (playerPercentage - leagueAveragePercentage) * (attempt / leagueAttempt);

  switch (true) {
    case value >= eliteClassification:
      return 'bold centered dark-green';
    case value >= greatClassification && value < eliteClassification:
      return 'bold centered green';
    case value >= goodClassification && value < greatClassification:
      return 'bold centered light-green';
    case value >= horribleClassification && value < badClassification:
      return 'bold centered light-red';
    case value < horribleClassification:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getCountingClassification(category, value) {
  if (!value) return;

  let eliteClassification, greatClassification, goodClassification, badClassification, horribleClassification;

  switch (category) {
    case 'threePoint':
      eliteClassification = configs.threePoint.eliteClassification;
      greatClassification = configs.threePoint.greatClassification;
      goodClassification = configs.threePoint.goodClassification;
      badClassification = configs.threePoint.badClassification;
      horribleClassification = configs.threePoint.horribleClassification;
      break;
    case 'point':
      eliteClassification = configs.point.eliteClassification;
      greatClassification = configs.point.greatClassification;
      goodClassification = configs.point.goodClassification;
      badClassification = configs.point.badClassification;
      horribleClassification = configs.point.horribleClassification;
      break;
    case 'rebound':
      eliteClassification = configs.rebound.eliteClassification;
      greatClassification = configs.rebound.greatClassification;
      goodClassification = configs.rebound.goodClassification;
      badClassification = configs.rebound.badClassification;
      horribleClassification = configs.rebound.horribleClassification;
      break;
    case 'assist':
      eliteClassification = configs.assist.eliteClassification;
      greatClassification = configs.assist.greatClassification;
      goodClassification = configs.assist.goodClassification;
      badClassification = configs.assist.badClassification;
      horribleClassification = configs.assist.horribleClassification;
      break;
    case 'steal':
      eliteClassification = configs.steal.eliteClassification;
      greatClassification = configs.steal.greatClassification;
      goodClassification = configs.steal.goodClassification;
      badClassification = configs.steal.badClassification;
      horribleClassification = configs.steal.horribleClassification;
      break;
    case 'block':
      eliteClassification = configs.block.eliteClassification;
      greatClassification = configs.block.greatClassification;
      goodClassification = configs.block.goodClassification;
      badClassification = configs.block.badClassification;
      horribleClassification = configs.block.horribleClassification;
      break;
  }

  switch (true) {
    case value >= eliteClassification:
      return 'bold centered dark-green';
    case value >= greatClassification && value < eliteClassification:
      return 'bold centered green';
    case value >= goodClassification && value < greatClassification:
      return 'bold centered light-green';
    case value >= horribleClassification && value < badClassification:
      return 'bold centered light-red';
    case value < horribleClassification:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

function getTurnoverClassification(value) {
  if (!value) return;

  switch (true) {
    case value <= configs.turnover.eliteClassification:
      return 'bold centered dark-green';
    case value <= configs.turnover.greatClassification && value > configs.turnover.eliteClassification:
      return 'bold centered green';
    case value <= configs.turnover.goodClassification && value > configs.turnover.greatClassification:
      return 'bold centered light-green';
    case value < configs.turnover.horribleClassification && value >= configs.turnover.badClassification:
      return 'bold centered light-red';
    case value >= configs.turnover.horribleClassification:
      return 'bold centered red';
    default:
      return 'bold centered';
  }
}

export {
  getPercentageClassification,
  getCountingClassification,
  getTurnoverClassification
};
