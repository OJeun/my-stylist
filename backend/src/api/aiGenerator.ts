import express from "express";
const fs = require("fs");
const path = require("path");
const app = express();

const router = express.Router();

function convertImageToBase64(imagePath: string) {
  const imageBuffer = fs.readFileSync(imagePath);
  return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
}

router.post("/ai-generator", (req, res) => {
  const { selectedCategory, selectedCategoryCheckbox, selectedItem } = req.body;
  console.log(
    "Received generation request:",
    selectedCategory,
    selectedCategoryCheckbox,
    selectedItem
  );

  const imagePath = path.join(__dirname, "image.jpeg");
  const base64Image = convertImageToBase64(imagePath);

  setTimeout(()=> {
    res.json({ image: [base64Image] });
  }, 4000)

});

export default router;
