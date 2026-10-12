const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/onenetshop';

const seedProducts = [
  {
    title: '纪念日定制礼盒',
    description: '精选礼盒装，适合纪念日和生日祝福。',
    price: 299,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '定制照片挂画',
    description: '把美好瞬间定格成家居装饰。',
    price: 399,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '木质相框套装',
    description: '简约设计，适合送长辈和朋友。',
    price: 199,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '创意纪念明信片',
    description: '定制化图文内容，适合二次创意礼物。',
    price: 89,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '定制相册',
    description: '记录每一段珍贵时光的私人故事。',
    price: 469,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
];

mongoose
  .connect(mongoUrl)
  .then(async () => {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany(seedProducts);
      console.log('Seed data inserted');
    } else {
      console.log('Database already has products, skip seed');
    }

    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed failed:', error.message);
    process.exit(1);
  });
