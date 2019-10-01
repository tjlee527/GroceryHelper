const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Items = require('../database/index.js');
const axios = require('axios');

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

app.get('/api/recipes', (req, res) => {
  const query = req.query.list.splice(0,3).join(',')
  axios.get(`http://www.recipepuppy.com/api/?i=${query}`)
    .then((response) => {
      const results = response.data.results.slice(0, 5);
      res.send(results);
    }) 
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
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
  const itemName = { item: req.body.item};
  const updateObj = req.body;
  Items.update(itemName, updateObj, (err, product) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})

app.delete('/api/item/delete', (req, res) => {
  const itemName = req.body.item;
  Items.deleteOne({item: itemName}, (err, product) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
})



app.listen(port, () => console.log(`server listening on port ${port}`));