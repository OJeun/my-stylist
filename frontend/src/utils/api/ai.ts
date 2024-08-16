import { ClosetItem } from "../../stores/features/closetItems";
import { getTypeId, getTypeIdArray } from "./getId";

type data = {
    userId: string;
    selectedCategory: string;
    selectedCategoryCheckbox: string | string[];
    selectedItem: ClosetItem | null;
}

export const fetchAIRecommendation = async (data: data) => {
  const selectedCategoryId = getTypeId(data.selectedCategory)
  const selectedCategoryIds = getTypeIdArray(data.selectedCategoryCheckbox)

  const convertedData = {
    userId: data.userId,
    selectedCategory: data.selectedCategory,
    selectedCategoryCheckbox:selectedCategoryIds,
    selectedItem: data.selectedItem
  }

  console.log("selected Data:", data.selectedItem);

  
    try {
      const response = await fetch("/api/ai-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedData),
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
  