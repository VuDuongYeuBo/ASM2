var express = require('express');
const ToyModels = require('../models/ToyModels');
var router = express.Router();

router.get('/', async (req, res) => {

  res.render('index')
})

router.get('/admin', async (req, res) => {
  var toys = await ToyModels.find({});
  var total = await ToyModels.count();
  res.render('admin', { toys : toys , total : total })
})
router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/list', async (req, res) => {
  var toys = await ToyModels.find({});
  res.render('list', { toys: toys });
})

router.get('/delete/:id', async(req, res) => {
  await ToyModels.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete succeed !')})
  .catch((err) => { console.log ('Delete failed !')});

  res.redirect('/admin');
})

router.get('/drop', async(req, res) => {
  await ToyModels.deleteMany({})
  .then(() => { console.log ('Delete all succeed !')});
  
  res.redirect('/admin');
})

router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toys = await ToyModels.findById(id);
  var order_quantity = req.body.order_quantity;
  var total_price = price * order_quantity;
  res.render('order_confirm', { toys: toys, order_quantity : order_quantity, total_price : total_price});
})

router.get('/add', (req, res) => {
  res.render('add');
})

router.post('/add', async (req, res) => {
  var toy = req.body;
  await ToyModels.create(toy)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/admin');
})

router.get('/edit/:id', async (req, res) => {
  var toys = await ToyModels.findById(req.params.id);
  res.render('edit', { toys : toys});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  await ToyModels.findByIdAndUpdate(id)
  .then(() => { console.log('Edit mobile succeed !') });
  res.redirect('/admin');
})

module.exports = router;