export const convertSeasonIdToSeason = (seasonId: number) => {
  switch (seasonId) {
    case 1:
      return "spring-fall";
    case 2:
      return "summer";
    case 3:
      return "winter";
  }
};

export const convertSeasonIdsToSeasons = (seasonIds: number[]) => {
  return seasonIds.map((seasonId) => convertSeasonIdToSeason(seasonId));
};

export const convertTypeIdToCategory = (typeId: number) => {
  switch (typeId) {
    case 1:
      return "top";
    case 2:
      return "bottom";
    case 3:
      return "outer";
    case 4:
      return "shoes";
    case 5:
      return "bag";
    case 6:
      return "accessories";
  }
};

export const convertTypeIdsToCategories = (typeIds: number[]) => {
  return typeIds.map((typeId) => convertTypeIdToCategory(typeId));
};
