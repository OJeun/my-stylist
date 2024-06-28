import express from 'express';
import { addUser } from '../database/fakedata'

const router = express.Router();


router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received signup request:', email, password, name);

  addUser(email, password, name)
  
  res.json({message: "Successfully signed up!"})

});

export default router;
