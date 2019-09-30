const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Items = require('../database/index.js');
const port = 3000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'));


app.get('/api/item/required', (req, res) => {
  Items.find({ required: 'true'}, (err, docs) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(docs)
  });
})

app.get('/api/item/fun', (req, res) => {
  Items.find({required: 'false'}, (err, docs) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(docs)
  });
})

app.post('/api/item', (req, res) => {
  const data = new Items(req.body);
  data.save((err, product) => {
    if (err) {
      res.sendStatus(500);
    } 
    res.sendStatus(200);
  });
})

app.put('/api/item/update', (req, res) => {
  console.log(req.body);
  const itemName = { item: req.body.item};
  const updateObj = req.body;
  Items.update(itemName, updateObj, (err, product) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
  // const data = new Items(req.body);
  // data.save((err, product) => {
  //   if (err) {
  //     res.sendStatus(500);
  //   } 
  //   res.sendStatus(200);
  // });
})



app.listen(port, () => console.log(`server listening on port ${port}`));