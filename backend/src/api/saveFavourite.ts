import express from 'express';

const router = express.Router();


router.post('/save-favourtie', (req, res) => {
  const { selectedItem, generatedImages} = req.body;
  console.log('Received signup request:', selectedItem, generatedImages);

  res.json({message: "Successfully saved!"})

});

export default router;
