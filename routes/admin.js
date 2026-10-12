const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Product = require('../models/Product');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 10000)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.render('admin', {
    title: '后台管理',
    products,
  });
});

router.post('/add', upload.single('image'), async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !price) {
    return res.redirect('/admin');
  }

  const image = req.file ? `/uploads/${req.file.filename}` : '/images/placeholder.svg';

  await Product.create({
    title,
    description,
    price: Number(price),
    image,
  });

  res.redirect('/admin');
});

router.post('/remove/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
