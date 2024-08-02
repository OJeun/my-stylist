import express from 'express';
import { addFavoriteCombination, fetchFavoriteItems } from '../database/favorite';

const router = express.Router();
router.post('/save-favorite', (req, res) => {
  const { selectedItem, generatedItems, userId} = req.body;
  addFavoriteCombination(userId, selectedItem, generatedItems);
  res.json({message: "Successfully saved!"})
});

router.get('/favorite', async (req, res) => {
  const userId = req.query.userId;
  try {
    const fetchedItems = await fetchFavoriteItems(userId as string);
    res.json(fetchedItems); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorite items' });
  }
});
export default router;

