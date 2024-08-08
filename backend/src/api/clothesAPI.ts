import express from 'express';
import {
  addCloth,
  getClothByUserIdAndClothId,
  getClothesByUserIdAndTypeId,
  deleteCloth,
  getAllClothesByTypeAndSeason,
} from '../database/clothes';

const router = express.Router();

router.post('/save-cloth', async (req, res) => {
  const selectedItem = req.body;
  console.log('Saving cloth:', selectedItem.season, selectedItem.convertedTypeId);
  try {
    await addCloth(
      selectedItem.userId,
      selectedItem.description,
      selectedItem.imgSrc,
      selectedItem.convertedSeason,
      selectedItem.convertedTypeId
    );
    res.json({ message: 'Successfully saved to the closet!' });
  } catch (error) {
    console.error('Error saving cloth:', error);
    res.status(500).json({ message: 'Error saving cloth' });
  }
});

router.get('/closet-items/:category', async (req, res) => {
  const { category } = req.params;
  const { userId } = req.query;

  const categoryId = parseInt(category, 10);
  try {
    const items = await getClothesByUserIdAndTypeId(userId as string, categoryId);
    res.json(items);
  } catch (error) {
    console.error('Error fetching clothes:', error);
    res.status(500).json({ message: 'Error fetching clothes' });
  }
});

router.get('/closet-items/:category/season/:seasonId', async (req, res) => {
  const { category, seasonId } = req.params;
  const { userId } = req.query;

  const categoryIntId = parseInt(category, 10);
  const seasonIntId = parseInt(seasonId, 10)

  try {
    const items = await getAllClothesByTypeAndSeason(userId as string, categoryIntId, seasonIntId)
    res.json(items);
  } catch (error) {
    console.error('Error fetching clothes:', error);
    res.status(500).json({ message: 'Error fetching clothes' });
  }
})

router.put('/delete-cloth/:clothId', async (req, res) => {
  const { userId } = req.query;
  const { typeId } = req.query;
  const { clothId } = req.params;
  console.log('Deleting cloth for user:', userId, 'and cloth Id:', clothId);
  try {
    const deletedItem = await getClothByUserIdAndClothId(
      userId as string,
      parseInt(clothId as string, 10)
    );
    await deleteCloth(userId as string, parseInt(typeId as string, 10), parseInt(clothId as string, 10));
    res.json(deletedItem);
  } catch (error) {
    console.error('Error deleting cloth:', error);
    res.status(500).json({ message: 'Error deleting cloth' });
  }
  console.log('successfully deleted!');
});

export default router;
