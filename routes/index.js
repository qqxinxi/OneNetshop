const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.render('index', {
    title: 'OneNetshop',
    products,
  });
});

router.get('/cart', (req, res) => {
  res.render('cart', {
    title: '购物车',
    cart: req.session.cart,
  });
});

router.post('/cart/add/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.redirect('/');
  }

  const cart = req.session.cart;
  const existing = cart.items.find((item) => item.id.toString() === product._id.toString());

  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  req.session.cart = cart;

  res.redirect('/cart');
});

router.post('/cart/remove/:id', (req, res) => {
  const cart = req.session.cart;
  cart.items = cart.items.filter((item) => item.id.toString() !== req.params.id);
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  req.session.cart = cart;
  res.redirect('/cart');
});

router.post('/checkout', (req, res) => {
  const order = {
    items: req.session.cart.items,
    total: req.session.cart.total,
    createdAt: new Date(),
  };

  req.session.cart = { items: [], total: 0 };

  res.render('checkout-success', {
    title: '下单成功',
    order,
  });
});

module.exports = router;
