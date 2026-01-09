require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./db');

const seedProducts = [
  { title: 'Product 1', price: 10, image: '', category: 'Category 1' },
  { title: 'Product 2', price: 20, image: '', category: 'Category 2' },
  { title: 'Product 3', price: 30, image: '', category: 'Category 1' },
  { title: 'Product 4', price: 40, image: '', category: 'Category 3' },
  { title: 'Product 5', price: 50, image: '', category: 'Category 2' },
];

async function seedDB() {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(seedProducts);
  console.log('Database seeded with products!');
  mongoose.connection.close();
}

seedDB();
