import express from 'express';
import { addCloth } from '../database/clothes';

const router = express.Router();

router.post('/save-cloth', async (req, res) => {
  const selectedItem = req.body;
  console.log('Received new item:', selectedItem);

  try {
    await addCloth(
      selectedItem.description,
      selectedItem.imgSrc,
      selectedItem.season,
      selectedItem.typeId
    );
    res.json({ message: 'Successfully saved to the closet!' });
  } catch (error) {
    console.error('Error saving cloth:', error);
    res.status(500).json({ message: 'Error saving cloth' });
  }
});

export default router;
