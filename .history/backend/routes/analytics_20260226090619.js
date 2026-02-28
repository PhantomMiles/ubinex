import express from 'express';
import {
  Analytics,
  saveAnalytics,
  getAnalyticsById,
  getLatestAnalytics,
  getAllAnalytics,
  getDailyAnalytics,
  updateAnalytics,
  deleteAnalytics,
  getAnalyticsSummary
} from '../models/Analytics.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get latest analytics summary (persisted)
router.get('/summary', (req, res) => {
  try {
    const summary = getAnalyticsSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Compute a fresh summary based on current products data
router.get('/compute', (req, res) => {
  try {
    const { getAllProducts } = require('../models/Product.js');
    const products = getAllProducts();
    const summary = computeAnalyticsFromProducts(products);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all analytics records
router.get('/', (req, res) => {
  try {
    const allAnalytics = getAllAnalytics();
    res.json(allAnalytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get analytics for last N days
router.get('/daily/:days', (req, res) => {
  try {
    const days = parseInt(req.params.days) || 30;
    const dailyAnalytics = getDailyAnalytics(days);
    res.json(dailyAnalytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest analytics
router.get('/latest', (req, res) => {
  try {
    const latest = getLatestAnalytics();
    if (!latest) {
      return res.status(404).json({ error: 'No analytics data found' });
    }
    res.json(latest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific analytics by ID
router.get('/:id', (req, res) => {
  try {
    const record = getAnalyticsById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Analytics record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new analytics record (admin only)
router.post('/', authenticateToken, (req, res) => {
  try {
    const { totalSales, totalRevenue, totalProducts, totalUsers, topProducts, salesByCategory, productsSoldCount, activeListings } = req.body;

    const analytics = new Analytics({
      totalSales,
      totalRevenue,
      totalProducts,
      totalUsers,
      topProducts: topProducts || [],
      salesByCategory: salesByCategory || {},
      productsSoldCount,
      activeListings,
      date: new Date()
    });

    saveAnalytics(analytics);
    res.status(201).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update analytics record
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const record = getAnalyticsById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Analytics record not found' });
    }

    const updated = updateAnalytics(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete analytics record
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const record = getAnalyticsById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Analytics record not found' });
    }

    deleteAnalytics(req.params.id);
    res.json({ message: 'Analytics record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
