#!/usr/bin/env node

import { agroProducts } from "../src/data/agroProducts.js";

console.log("✓ AgroLink Product Catalog");
console.log("Total products:", agroProducts.length);
console.log("---");

// Group by category
const byCategory = {};
agroProducts.forEach((p) => {
  if (!byCategory[p.category]) byCategory[p.category] = [];
  byCategory[p.category].push(p);
});

// Display summary
Object.entries(byCategory)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([cat, items]) => {
    console.log(`\n${cat} (${items.length})`);
    items.slice(0, 3).forEach((p) => {
      const price = p.pricePerKg || p.pricePerLiter || p.pricePerUnit || 0;
      const unit = p.unit || "kg";
      const stock = p.stockKg || p.stockLiters || p.stockUnits || 0;
      console.log(
        `  • ${p.name}: GHS ${price}/${unit} | Stock: ${stock} | ${p.location}`
      );
    });
    if (items.length > 3) {
      console.log(`  ... and ${items.length - 3} more`);
    }
  });

console.log("\n✓ All products loaded successfully!");
