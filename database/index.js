const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/groceryList', {useNewUrlParser: true});

const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const itemSchema = new Schema({
  item: String,
  type: String,
  price: String, 
  required: String,
  quantity: Number
});

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;