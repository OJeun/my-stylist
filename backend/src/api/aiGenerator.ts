// import express from "express";
// import readClosetItems, { ClosetItem } from "../utils/parseJSON";
// import path from "path";

// const app = express();

// const router = express.Router();

// router.post("/ai-generator", (req, res) => {
//   const { selectedCategory, selectedCategoryCheckbox, selectedItem } = req.body;
//   console.log(
//     "Received generation request:",
//     selectedCategory,
//     selectedCategoryCheckbox,
//     selectedItem
//   );
  
  
//   const formattedCategory = selectedCategoryCheckbox.map((category: string) =>
//     category.split('-')[0].toLowerCase()
//   );
//   console.log(__dirname)
//   const filePath = path.resolve(__dirname, '../database/closetItems.json');

//   let eachItem: ClosetItem[];
//   const response: ClosetItem[] = [];

//   formattedCategory.forEach((category: string) => {
//     eachItem = readClosetItems(filePath, category)
//     response.push(eachItem[0])
//   }
//   )

//   setTimeout(()=> {
//     res.json(response);
//   }, 1000)

// });

// export default router;
