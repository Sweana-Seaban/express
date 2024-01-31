const express = require('express');
const app = express();

app.use(express.json());
app.get('/hello', (req, res) => {
  res.send(`Hello, ${req.query.person}!`);
});

app.listen(4000);