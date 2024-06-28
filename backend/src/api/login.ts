import express from 'express';
import jwt from 'jsonwebtoken';
import users from '../database/fakedata'

const router = express.Router();
const accessSecret = 'access-secret';


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', email, password);

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const accessToken = jwt.sign({ name: user.name, uuid: user.uuid }, accessSecret, { expiresIn: '1h' });
    res.json({ accessToken, name: user.name, uuid: user.uuid, email: user.email });
  } else {
    res.status(401).json({ message: 'Check the mssage' });
  }
});

export default router;
