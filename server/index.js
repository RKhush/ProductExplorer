
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// MongoDB models
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Favorite = require('./models/Favorite');

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Cart endpoints
app.get('/api/cart', async (req, res) => {
  try {
    const cart = await CartItem.find().populate('product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart', async (req, res) => {
  try {
    const { id, qty } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    let cartItem = await CartItem.findOne({ product: id });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = new CartItem({ product: id, qty });
      await cartItem.save();
    }
    const cart = await CartItem.find().populate('product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});


const mongoose = require('mongoose');
// Decrease quantity or remove item from cart
app.patch('/api/cart/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product id' });
    }
    const productId = new mongoose.Types.ObjectId(req.params.id);
    const cartItem = await CartItem.findOne({ product: productId });
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    cartItem.qty -= 1;
    if (cartItem.qty <= 0) {
      await CartItem.deleteOne({ product: productId });
    } else {
      await cartItem.save();
    }
    const cart = await CartItem.find().populate('product');
    res.json(cart);
  } catch (err) {
    console.error('PATCH /api/cart/:id error:', err);
    res.status(500).json({ error: 'Failed to decrease quantity' });
  }
});

// Remove item from cart (delete whole item)
app.delete('/api/cart/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid product id' });
    }
    const productId = new mongoose.Types.ObjectId(req.params.id);
    await CartItem.deleteOne({ product: productId });
    const cart = await CartItem.find().populate('product');
    res.json(cart);
  } catch (err) {
    console.error('DELETE /api/cart/:id error:', err);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

app.delete('/api/cart', async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.json([]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Favorites endpoints
app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find().populate('product');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

app.post('/api/favorites', async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    let favorite = await Favorite.findOne({ product: id });
    if (!favorite) {
      favorite = new Favorite({ product: id });
      await favorite.save();
    }
    const favorites = await Favorite.find().populate('product');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to favorites' });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    await Favorite.deleteOne({ product: req.params.id });
    const favorites = await Favorite.find().populate('product');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
