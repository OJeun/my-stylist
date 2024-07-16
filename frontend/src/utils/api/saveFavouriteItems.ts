import { ClosetItem } from "../../stores/features/closetItems";

type FavoriteItemData = {
    selectedItem: ClosetItem;
    generatedImages: string[];
}

export const saveImagesToFavourite = async (data: FavoriteItemData) => {
    try {
      const response = await fetch("/api/favourite_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to generate AI recommendation");
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      throw error;
    }
  };
  