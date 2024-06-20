const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.json({ users: ['user1', 'user2', 'user3'] });
});

app.listen(8888, () => {
  console.log('Server started on port 8888');
});
