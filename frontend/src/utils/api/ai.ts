import { ClothingItem } from "../../components/ItemCard";

type data = {
    selectedCategory: string | null;
    selectedCategoryCheckbox: string | string[];
    selectedItem: ClothingItem | null;
}

export const fetchAIRecommendation = async (data: data) => {
    try {
      const response = await fetch("/api/ai-generator", {
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
  