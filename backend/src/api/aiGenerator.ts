import express from "express";
import path from "path";
import { ClosetItem } from "../database/favorite";
import { getClothesByUserIdAndTypeId, getFirstClotheByUserIdAndTypeId } from "../database/clothes";

const app = express();

const router = express.Router();

router.post("/ai-generator", async (req, res) => {
  const { userId, selectedCategory, selectedCategoryCheckbox, selectedItem } = req.body;
  console.log(
    "Received generation request:",
    userId,
    selectedCategory,
    selectedCategoryCheckbox,
    selectedItem
  );
  
    // AI Generation Logic Here
    // This code is just a template and should be replaced with actual AI generation logic
    // Return => res.json({selectedItem: selectedItem, generatedItems: generatedItems });
    console.log("Selected Category:", selectedCategoryCheckbox);
    const generatedItems: ClosetItem[] = await Promise.all(selectedCategoryCheckbox.map(async (category: number) => {
        return await getFirstClotheByUserIdAndTypeId(userId, category);
    }));

    return res.json({selectedItem: selectedItem, generatedItems: generatedItems });

});

export default router;
