import express from 'express';
import { addFavoriteCombination, deleteFavoriteCombination, fetchFavoriteItems, replaceClothInFavorite } from '../database/favorite';

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
})

router.put('/favorites/replace', async (req, res) => {
  const { favoriteCombinationId, originalClothId, newClothId } = req.body;

  try {
    const changes = await replaceClothInFavorite(
      favoriteCombinationId,
      originalClothId,
      newClothId
    );

    if (changes === 0) {
      res
        .status(404)
        .json({ message: 'No matching combination found to update' });
    } else {
      res.status(200).json({ message: 'Cloth replaced successfully' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error replacing cloth in favorite combination' });
  }
});

export default router;

