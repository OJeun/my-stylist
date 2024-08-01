import express from 'express';
import bodyParser from 'body-parser';
import loginRouter from './api/login';
import signupRouter from './api/signup';
// import generatorRouter from './api/aiGenerator';
import saveFavouriteRouter from './api/saveFavourite';
import saveClothRouter from './api/saveCloth';
import cors from 'cors';
import { initializeDatabase } from './database/db';

const app = express();
app.use(bodyParser.json());
app.use(cors());

initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    
    app.use('/api', loginRouter);
    app.use('/api', signupRouter);
    // app.use('/api', generatorRouter);
    app.use('/api', saveFavouriteRouter);
    app.use('/api', saveClothRouter);

    app.listen(8888, () => {
      console.log(`Server running on port ${8888}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
