import express from 'express';
import { addFavoriteCombination, deleteFavoriteCombination, fetchFavoriteItems } from '../database/favorite';

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

router.delete('/favorites/:favoriteCombinationId', (req, res) => {
  const favoriteCombinationId = req.params.favoriteCombinationId;
  const convertedFavoriteCombinationId = parseInt(favoriteCombinationId);
  deleteFavoriteCombination(convertedFavoriteCombinationId);
  res.json({message: `Successfully deleted item with id ${favoriteCombinationId}`});
});

export default router;

