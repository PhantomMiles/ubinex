import express from 'express';
import { Product, saveProduct, getProductById, getAllProducts, getProductsByCategory, updateProduct, deleteProduct, searchProducts } from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  try {
    const products = getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
router.get('/category/:category', (req, res) => {
  try {
    const products = getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search products
router.get('/search/:query', (req, res) => {
  try {
    const products = searchProducts(req.params.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (admin/farmer)
// authentication is optional so that the admin UI can operate without a login token
router.post('/', (req, res, next) => {
  // try to authenticate if a bearer token is present
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    return authenticateToken(req, res, next);
  }
  next();
}, (req, res) => {
  try {
    const { name, category, description, price, unit, stock, location, images, icon, image } = req.body;

    if (!name || !category || !price || !unit || stock === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const productData = {
      name,
      category,
      description,
      price,
      unit,
      stock,
      location,
      images: images || image ? (images || [image]) : [],
      icon,
      image,
      farmerId: req.user ? req.user.id : 'admin'
    };

    const product = new Product(productData);

    saveProduct(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (owner or admin)
router.put('/:id', (req, res, next) => {
  // optional authentication
  const authHeader = req.headers['authorization'];
  if (authHeader) return authenticateToken(req, res, next);
  next();
}, (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (req.user) {
      if (product.farmerId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to update this product' });
      }
    }

    const updated = updateProduct(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (owner or admin)
router.delete('/:id', (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader) return authenticateToken(req, res, next);
  next();
}, (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (req.user) {
      if (product.farmerId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Not authorized to delete this product' });
      }
    }

    deleteProduct(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
