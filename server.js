require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onenetshop';

const ensureDirectories = () => {
  ['public/uploads', 'public/images'].forEach((dir) => {
    fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  });
};
ensureDirectories();

mongoose
  .connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'onenetshop-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl,
      ttl: 60 * 60 * 24 * 7,
    }),
  })
);

app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = { items: [], total: 0 };
  }
  res.locals.cart = req.session.cart;
  next();
});

const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404 页面' });
});

app.listen(PORT, () => {
  console.log(`OneNetshop is running at http://localhost:${PORT}`);
});
