import express from 'express';
import { addCloth, getClothesByUserIdAndTypeId, deleteCloth } from '../database/clothes';

const router = express.Router();

router.post('/save-cloth', async (req, res) => {
  const selectedItem = req.body;
  try {
    await addCloth(
      selectedItem.userId,
      selectedItem.description,
      selectedItem.imgSrc,
      selectedItem.season,
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
  console.log('Fetching clothes for user:', userId, 'and category:', categoryId);
  try {
    const items = await getClothesByUserIdAndTypeId(userId as string, categoryId);
    res.json(items);
    console.log('Items:', items);
  } catch (error) {
    console.error('Error fetching clothes:', error);
    res.status(500).json({ message: 'Error fetching clothes' });
  }
});

router.delete('/delete-cloth/:clothId', async (req, res) => {
  const { userId } = req.query;
  const { clothId } = req.params;
  console.log('Deleting cloth for user:', userId, 'and cloth Id:', clothId);
  try {
    await deleteCloth(userId as string, parseInt(clothId as string, 10));
    res.json({ message: 'Successfully deleted the cloth!' });
  } catch (error) {
    console.error('Error deleting cloth:', error);
    res.status(500).json({ message: 'Error deleting cloth' });
  }
  console.log("successfully deleted!")
});

export default router;
