var express = require('express');
const ToyModels = require('../models/ToyModels');
const Toy2Models = require('../models/Toy2Models');
var router = express.Router();

router.get('/', async (req, res) => {

  res.render('index')
})

router.get('/admin', async (req, res) => {
  var toys = await ToyModels.find({});
  var total = await ToyModels.count();
  res.render('admin', { toys : toys , total : total })
})
router.get('/admin1', async (req, res) => {
  var toys2 = await Toy2Models.find({});
  var total = await Toy2Models.count();
  res.render('admin1', { toys2 : toys2 , total : total })
})
router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/list', async (req, res) => {
  var toys = await ToyModels.find({});
  res.render('list', { toys: toys });
})
router.get('/list1', async (req, res) => {
  var toys2 = await Toy2Models.find({});
  res.render('list1', { toys2: toys2 });
})

router.get('/delete/:id', async(req, res) => {
  await ToyModels.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete succeed !')})
  .catch((err) => { console.log ('Delete failed !')});

  res.redirect('/admin');
})
router.get('/delete1/:id', async(req, res) => {
  await Toy2Models.findByIdAndDelete(req.params.id)
  .then(() => { console.log ('Delete succeed !')})
  .catch((err) => { console.log ('Delete failed !')});

  res.redirect('/admin1');
})

router.get('/drop', async(req, res) => {
  await ToyModels.deleteMany({})
  .then(() => { console.log ('Delete all succeed !')});
  
  res.redirect('/admin');
})

router.get('/drop', async(req, res) => {
  await ToyModels.deleteMany({})
  .then(() => { console.log ('Delete all succeed !')});
  
  res.redirect('/admin1');
})
router.post('/order', async (req, res) => {
  var id = req.body.id;
  var toys = await ToyModels.findById(id);
  var order_quantity = req.body.order_quantity;
  var price = req.body.price;
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

router.get('/add1', (req, res) => {
  res.render('add1');
})

router.post('/add1', async (req, res) => {
  var toys2 = req.body;
  await Toy2Models.create(toys2)
  .then(() => { console.log ('Add new toy succeed !')});
  res.redirect('/admin1');
})
router.get('/edit/:id', async (req, res) => {
  var toys = await ToyModels.findById(req.params.id);
  res.render('edit', { toys : toys});
})

router.post('/edit/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData1=req.body;
  await ToyModels.findByIdAndUpdate(id,updatedData1)
     .then(() => { console.log('Edit toy succeed!') });
  res.redirect('/admin');
})
router.get('/edit1/:id', async (req, res) => {
  var toys2 = await Toy2Models.findById(req.params.id);
  res.render('edit1', { toys2 : toys2});
})

router.post('/edit1/:id', async (req, res) => {
  var id = req.params.id;
  var updatedData=req.body;
  await Toy2Models.findByIdAndUpdate(id,updatedData)
     .then(() => { console.log('Edit toy succeed!') });
  res.redirect('/admin1');
})

module.exports = router;