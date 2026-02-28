import { v4 as uuid } from 'uuid';

const products = new Map();

export class Product {
  constructor(data) {
    this.id = uuid();
    this.name = data.name;
    this.category = data.category;
    this.description = data.description;
    this.price = data.price;
    this.unit = data.unit; // 'kg', 'liter', 'bag', 'piece'
    this.stock = data.stock;
    // allow single image or array of images
    this.icon = data.icon || '';
    this.image = data.image || (Array.isArray(data.images) ? data.images[0] : '') || '';
    this.images = data.images || (this.image ? [this.image] : []);
    this.farmerId = data.farmerId;
    this.location = data.location;
    this.ratings = [];
    this.inStock = data.stock > 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStock(quantity) {
    this.stock = Math.max(0, this.stock - quantity);
    this.inStock = this.stock > 0;
    this.updatedAt = new Date();
  }

  addRating(rating, reviewer) {
    this.ratings.push({
      id: uuid(),
      rating,
      reviewer,
      date: new Date()
    });
  }

  getAverageRating() {
    if (this.ratings.length === 0) return 0;
    return (this.ratings.reduce((sum, r) => sum + r.rating, 0) / this.ratings.length).toFixed(1);
  }
}

export function saveProduct(product) {
  products.set(product.id, product);
  return product;
}

export function getProductById(id) {
  return products.get(id);
}

export function getProductsByFarmerId(farmerId) {
  const farmerProducts = [];
  for (const product of products.values()) {
    if (product.farmerId === farmerId) {
      farmerProducts.push(product);
    }
  }
  return farmerProducts;
}

export function getAllProducts() {
  return Array.from(products.values());
}

export function getProductsByCategory(category) {
  const categoryProducts = [];
  for (const product of products.values()) {
    if (product.category.toLowerCase() === category.toLowerCase()) {
      categoryProducts.push(product);
    }
  }
  return categoryProducts;
}

export function updateProduct(id, updates) {
  const product = products.get(id);
  if (product) {
    // support updating icon and image fields directly
    if (updates.icon !== undefined) product.icon = updates.icon;
    if (updates.image !== undefined) {
      product.image = updates.image;
      if (!product.images || product.images.length === 0) {
        product.images = [updates.image];
      }
    }
    if (updates.images !== undefined) {
      product.images = updates.images;
      if (!product.image && updates.images.length > 0) {
        product.image = updates.images[0];
      }
    }
    Object.assign(product, updates);
    product.updatedAt = new Date();
  }
  return product;
}

export function deleteProduct(id) {
  return products.delete(id);
}

export function searchProducts(query) {
  const results = [];
  for (const product of products.values()) {
    if (
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.location.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push(product);
    }
  }
  return results;
}
