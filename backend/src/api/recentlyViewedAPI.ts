import express from 'express';
import { addRecentlyViewedOutfitSuggestion } from '../database/recentlyViewed';

const router = express.Router();

router.post('/recently-viewed', async (req, res) => {
  const { selectedItem, generatedItems, userId } = req.body;
  // Save the recently viewed outfit suggestion to the database

  addRecentlyViewedOutfitSuggestion(userId, selectedItem, generatedItems);
  res.json({ message: 'Successfully added to the recently viewed!' });
});

export default router;