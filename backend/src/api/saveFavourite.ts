import express from 'express';
import { addFavoriteCombination } from '../database/favorite';

const router = express.Router();


router.post('/save-favourtie', (req, res) => {
  const { selectedItem, generatedImages, userId} = req.body;
  console.log('Received favourite item:', selectedItem, generatedImages, userId);
  
  // Save the favourite item to the database
  addFavoriteCombination(userId, selectedItem, generatedImages);
  res.json({message: "Successfully saved!"})

});

export default router;
