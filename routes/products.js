const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.redirect('/');
  }

  res.render('product', {
    title: product.title,
    product,
  });
});

module.exports = router;
