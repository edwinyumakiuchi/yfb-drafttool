function generateAuctionValues() {
  const auctionValues = [
    { pick: 1, value: 67 },
    { pick: 2, value: 63 },
    { pick: 3, value: 62 },
    { pick: 4, value: 60 },
    { pick: 5, value: 59 },
    { pick: 6, value: 58 },
    { pick: 7, value: 57 },
    { pick: { start: 8, end: 9 }, value: 56 },
    { pick: 10, value: 51 },
    { pick: 11, value: 50 },
    { pick: 12, value: 47 },
    { pick: 13, value: 45 },
    { pick: { start: 14, end: 15 }, value: 43 },
    { pick: 16, value: 41 },
    { pick: { start: 17, end: 22 }, value: 35 },
    { pick: { start: 23, end: 24 }, value: 33 },
    { pick: { start: 25, end: 27 }, value: 32 },
    { pick: { start: 28, end: 30 }, value: 31 },
    { pick: { start: 31, end: 32 }, value: 30 },
    { pick: { start: 33, end: 34 }, value: 28 },
    { pick: 35, value: 27 },
    { pick: 36, value: 26 },
    { pick: { start: 37, end: 38 }, value: 25 },
    { pick: { start: 39, end: 40 }, value: 24 },
    { pick: { start: 41, end: 43 }, value: 23 },
    { pick: { start: 44, end: 47 }, value: 22 },
    { pick: { start: 48, end: 49 }, value: 21 },
    { pick: { start: 50, end: 51 }, value: 19 },
    { pick: { start: 52, end: 53 }, value: 18 },
    { pick: { start: 54, end: 55 }, value: 17 },
    { pick: { start: 56, end: 57 }, value: 16 },
    { pick: { start: 58, end: 59 }, value: 15 },
    { pick: { start: 60, end: 61 }, value: 14 },
    { pick: { start: 62, end: 66 }, value: 13 },
    { pick: { start: 67, end: 68 }, value: 12 },
    { pick: { start: 69, end: 73 }, value: 11 },
    { pick: { start: 74, end: 78 }, value: 10 },
    { pick: { start: 79, end: 80 }, value: 9 },
    { pick: { start: 81, end: 83 }, value: 8 },
    { pick: { start: 84, end: 87 }, value: 7 },
    { pick: { start: 88, end: 92 }, value: 6 },
    { pick: { start: 93, end: 97 }, value: 5 },
    { pick: { start: 98, end: 102 }, value: 4 },
    { pick: { start: 103, end: 108 }, value: 3 },
    { pick: { start: 109, end: 122 }, value: 2 },
    { pick: { start: 123, end: 200 }, value: 1 }
  ];

  // Expand ranges into individual picks
  const expandedAuctionValues = [];
  auctionValues.forEach((config) => {
    if (typeof config.pick === "number") {
      expandedAuctionValues.push(config);
    } else if (typeof config.pick === "object" && "start" in config.pick && "end" in config.pick) {
      const { start, end } = config.pick;
      for (let i = start; i <= end; i++) {
        expandedAuctionValues.push({ pick: i, value: config.value });
      }
    }
  });

  return expandedAuctionValues;
}

const AuctionConfigs = {
  auctionValues: generateAuctionValues(),
};

module.exports = AuctionConfigs;
