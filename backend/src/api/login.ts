import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

interface IUser {
  email: string;
  password: string;
  name: string;
  uuid: string;
}

const users: IUser[] = [
  {
    email: 'test@test.ca',
    password: 'abc123',
    name: 'Test User',
    uuid: '1234-5678-9101-1121'
  }
];

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
