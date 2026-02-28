import { v4 as uuid } from 'uuid';

const analytics = new Map();

export class Analytics {
  constructor(data) {
    this.id = uuid();
    this.date = data.date || new Date();
    this.totalSales = data.totalSales || 0;
    this.totalRevenue = data.totalRevenue || 0;
    this.totalProducts = data.totalProducts || 0;
    this.totalUsers = data.totalUsers || 0;
    this.topProducts = data.topProducts || [];
    this.salesByCategory = data.salesByCategory || {};
    this.productsSoldCount = data.productsSoldCount || 0;
    this.activeListings = data.activeListings || 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateMetrics(metrics) {
    if (metrics.totalSales !== undefined) this.totalSales = metrics.totalSales;
    if (metrics.totalRevenue !== undefined) this.totalRevenue = metrics.totalRevenue;
    if (metrics.totalProducts !== undefined) this.totalProducts = metrics.totalProducts;
    if (metrics.totalUsers !== undefined) this.totalUsers = metrics.totalUsers;
    if (metrics.topProducts !== undefined) this.topProducts = metrics.topProducts;
    if (metrics.salesByCategory !== undefined) this.salesByCategory = metrics.salesByCategory;
    if (metrics.productsSoldCount !== undefined) this.productsSoldCount = metrics.productsSoldCount;
    if (metrics.activeListings !== undefined) this.activeListings = metrics.activeListings;
    this.updatedAt = new Date();
  }

  getRevenueTrend() {
    return {
      totalRevenue: this.totalRevenue,
      productsCount: this.productsSoldCount,
      averagePrice: this.totalRevenue / (this.productsSoldCount || 1)
    };
  }

  getCategorySalesBreakdown() {
    return this.salesByCategory;
  }

  getTopSellingProducts() {
    return this.topProducts.slice(0, 10);
  }
}

export function saveAnalytics(record) {
  analytics.set(record.id, record);
  return record;
}

export function getAnalyticsById(id) {
  return analytics.get(id);
}

export function getLatestAnalytics() {
  if (analytics.size === 0) return null;
  const entries = Array.from(analytics.values());
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

export function getAllAnalytics() {
  return Array.from(analytics.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getDailyAnalytics(days = 30) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const records = Array.from(analytics.values()).filter(record => 
    new Date(record.date) >= cutoff
  );
  
  return records.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function updateAnalytics(id, updates) {
  const record = analytics.get(id);
  if (record) {
    record.updateMetrics(updates);
  }
  return record;
}

export function deleteAnalytics(id) {
  return analytics.delete(id);
}

export function computeAnalyticsFromProducts(productsList) {
  const totalProducts = productsList.length;
  const activeListings = productsList.filter(p => p.stock > 0).length;
  const salesByCategory = {};
  let totalRevenue = 0;
  let totalSales = 0;

  productsList.forEach(p => {
    const cat = p.category || 'uncategorized';
    salesByCategory[cat] = (salesByCategory[cat] || 0) + (p.stock || 0);
    totalRevenue += (p.price || 0) * (p.stock || 0); // potential revenue
    totalSales += 0; // no actual sales data available
  });

  const topProducts = productsList
    .slice()
    .sort((a, b) => (b.stock || 0) - (a.stock || 0))
    .slice(0, 10);

  return {
    totalRevenue,
    totalSales,
    totalProducts,
    totalUsers: 0,
    topProducts,
    salesByCategory,
    activeListings,
    productsSoldCount: productsList.reduce((sum, p) => sum + (p.stock || 0), 0)
  };
}

export function getAnalyticsSummary() {
  if (analytics.size === 0) {
    return {
      totalRevenue: 0,
      totalSales: 0,
      totalProducts: 0,
      totalUsers: 0,
      topProducts: [],
      salesByCategory: {}
    };
  }

  const latest = getLatestAnalytics();
  return {
    totalRevenue: latest.totalRevenue,
    totalSales: latest.totalSales,
    totalProducts: latest.totalProducts,
    totalUsers: latest.totalUsers,
    topProducts: latest.getTopSellingProducts(),
    salesByCategory: latest.getCategorySalesBreakdown()
  };
}
