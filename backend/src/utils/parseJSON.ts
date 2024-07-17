// This function is temporal to fetch data from fake json file

import fs from "fs";

export interface ClosetItem {
  id: string;
  category: string;
  season: string;
  imageSrc: string;
}

export default function readClosetItems(
  filePath: string,
  category: string
): ClosetItem[] {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const rawJsonData = JSON.parse(data)[category];

    const formattedJsonData = rawJsonData.map(
      (item: { id: string; season: string; imageSrc: string }) => ({
        ...item,
        category: category,
      })
    );

    const items: ClosetItem[] = formattedJsonData;
    return items;
  } catch (err) {
    console.error("Error reading or parsing closetItem.json:", err);
    return [];
  }
}
