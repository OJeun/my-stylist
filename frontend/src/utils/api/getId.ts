export const getSeasonId = (seasons: string[]): number[] => {
  return seasons.map((season) => {
    switch (season.toLocaleLowerCase()) {
      case 'spring-fall':
        return 1;
      case 'summer':
        return 2;
      case 'winter':
        return 3;
      default:
        return 0;
    }
  });
};

export const getTypeId = (category: string) => {
  switch (category.toLowerCase()) {
    case "top":
      return 1;
    case "bottom":
      return 2;
    case "outer":
      return 3;
    case "shoes":
      return 4;
    case "bag":
      return 5;
    case "accessories":
      return 6;
    default:
      return 0;
  }
};

export const getTypeIdArray = (categories: string[] | string): number[] => {
  if (typeof categories === "string") {
    return [getTypeId(categories)];
  }
  return categories.map((category) => getTypeId(category));
} 


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
}

export const convertTypeIdsToCategories = (typeIds: number[]) => {
  return typeIds.map((typeId) => convertTypeIdToCategory(typeId));
}

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

