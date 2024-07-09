import express from 'express';
import bodyParser from 'body-parser';
import loginRouter from './api/login';
import signupRouter from './api/signup';
import generatorRouter from './api/aiGenerator'
import saveFavouriteRouter from './api/saveFavourite'
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api', loginRouter);
app.use('/api', signupRouter);
app.use('/api', generatorRouter);
app.use('/api', saveFavouriteRouter);


const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
