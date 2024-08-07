CREATE TABLE IF NOT EXISTS Users (
    userId VARCHAR(200) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Clothes (
    clothId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    typeId INTEGER NOT NULL,
    imgSrc TEXT,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE,
    FOREIGN KEY (typeId) REFERENCES ClothingType(typeId)
);

CREATE TABLE IF NOT EXISTS ClothingType (
    typeId INTEGER NOT NULL,
    typeName VARCHAR(200) NOT NULL,
    PRIMARY KEY (typeId)
);

CREATE TABLE IF NOT EXISTS Season (
    seasonId INTEGER NOT NULL,
    seasonName VARCHAR(200) NOT NULL,
    PRIMARY KEY (seasonId)
);

CREATE TABLE IF NOT EXISTS ClothesSeason (
    clothId INTEGER NOT NULL,
    seasonId INTEGER NOT NULL,
    PRIMARY KEY (clothId, seasonId),
    FOREIGN KEY (clothId) REFERENCES Clothes(clothId) ON DELETE CASCADE,
    FOREIGN KEY (seasonId) REFERENCES Season(seasonId)
);

CREATE TABLE IF NOT EXISTS UserFavoriteCombination (
    favoriteCombinationId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(200) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE IF NOT EXISTS FavoriteCombinationClothes (
    favoriteCombinationId INTEGER NOT NULL,
    clothId INTEGER NOT NULL,
    isGenerated BOOLEAN NOT NULL,
    PRIMARY KEY (favoriteCombinationId, clothId),
    FOREIGN KEY (favoriteCombinationId) REFERENCES UserFavoriteCombination(favoriteCombinationId) ON DELETE CASCADE,
    FOREIGN KEY (clothId) REFERENCES Clothes(clothId)
);

CREATE TABLE IF NOT EXISTS UserRecentlyViewedCombination (
    recentCombinationId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId VARCHAR(200) NOT NULL,
    viewedAt TIMESTAMP NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RecentlyViewedCombination (
    recentCombinationId INTEGER NOT NULL,
    clothId INTEGER NOT NULL,
    isGenerated BOOLEAN NOT NULL,
    PRIMARY KEY (recentCombinationId, clothId),
    FOREIGN KEY (recentCombinationId) REFERENCES UserRecentlyViewedCombination(recentCombinationId) ON DELETE CASCADE,
    FOREIGN KEY (clothId) REFERENCES Clothes(clothId)
);
