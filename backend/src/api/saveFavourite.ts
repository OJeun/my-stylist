import express from 'express';
import { addFavoriteCombination } from '../database/favorite';

const router = express.Router();


router.post('/save-favorite', (req, res) => {
  const { selectedItem, generatedItems, userId} = req.body;
  
  // Save the favourite item to the database
  addFavoriteCombination(userId, selectedItem, generatedItems);
  res.json({message: "Successfully saved!"})

});

export default router;
