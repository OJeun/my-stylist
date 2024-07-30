import express from 'express';
import { createUser, findUserByEmail } from '../database/user';


const router = express.Router();


router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    console.log(existingUser)
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await createUser(name, email, password);
    console.log()
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user'});
  }
});

export default router;
