const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Items = require('../database/index.js');
const port = 3000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));


app.post('/api/item', (req, res) => {
  const data = new Items(req.body);
  data.save((err, product) => {
    if (err) {
      res.sendStatus(500);
    } 
    res.sendStatus(200);
  })
})

app.listen(port, () => console.log(`server listening on port ${port}`));