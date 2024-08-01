import express from 'express';
import { updateUserName } from '../database/users';
import { getUserName } from '../database/users';

const router = express.Router();

router.get('/username', async (req, res) => {
  const { userId } = req.query;
  const name = await getUserName(userId as string);
  res.json({ name });
});

router.post('/update-username', async (req, res) => {
  const data = req.body;
  console.log('Received user data:', data);

  try {
    await updateUserName(data.userId, data.newName);
    res.json({ message: 'Successfully updated user name!' });
  } catch (error) {
    console.error('Error updating user name:', error);
    res.status(500).json({ message: 'Error updating user name' });
  }
});

export default router;
