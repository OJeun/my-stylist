import express from 'express';
import {
  addRecentlyViewedOutfitSuggestion,
  getRecentlyViewedOutfitSuggestion,
} from '../database/recentlyViewed';

const router = express.Router();

router.post('/recently-viewed', async (req, res) => {
  console.log('Received a request to /recently-viewed');
  const { selectedItem, generatedItems, userId } = req.body;

  // Wait for the recently viewed outfit suggestion to be saved to the database
  try {
    await addRecentlyViewedOutfitSuggestion(
      userId,
      selectedItem,
      generatedItems
    );
    res.json({ message: 'Successfully added to Recently Viewed!' });
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'An error occurred while adding to Recently Viewed',
        error,
      });
  }
});
router.get('/recently-viewed', async (req, res) => {
  const userId = req.query.userId;
  try {
    const fetchedItems = await getRecentlyViewedOutfitSuggestion(
      userId as string
    );
    res.json(fetchedItems);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to fetch recently viewed outfit suggestion' });
  }
});

export default router;
