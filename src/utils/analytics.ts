import type { Product } from '@/types/product';

export interface CategoryDistribution {
  category: string;
  count: number;
  percentage: number;
}

export interface PriceStats {
  average: number;
  min: number;
  max: number;
}

export interface RatingDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface TopCategory {
  category: string;
  count: number;
  percentage: number;
}

export function calculateCategoryDistribution(
  products: Product[]
): CategoryDistribution[] {
  const categoryMap = new Map<string, number>();

  products.forEach((product) => {
    const count = categoryMap.get(product.category) || 0;
    categoryMap.set(product.category, count + 1);
  });

  const total = products.length;
  const distribution: CategoryDistribution[] = [];

  categoryMap.forEach((count, category) => {
    const percentage = total > 0 ? Math.round((count / total) * 1000) / 10 : 0;
    distribution.push({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count,
      percentage,
    });
  });

  return distribution.sort((a, b) => b.count - a.count);
}

export function calculatePriceStats(products: Product[]): PriceStats {
  if (products.length === 0) {
    return { average: 0, min: 0, max: 0 };
  }

  const prices = products.map((p) => p.price);
  const sum = prices.reduce((acc, price) => acc + price, 0);
  const average = sum / prices.length;
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return {
    average: Math.round(average * 100) / 100,
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
  };
}

export function calculateRatingDistribution(
  products: Product[]
): RatingDistribution[] {
  const ranges = [
    { label: '4.5 - 5.0', min: 4.5, max: 5.0 },
    { label: '4.0 - 4.5', min: 4.0, max: 4.5 },
    { label: '3.5 - 4.0', min: 3.5, max: 4.0 },
    { label: '3.0 - 3.5', min: 3.0, max: 3.5 },
    { label: '2.5 - 3.0', min: 2.5, max: 3.0 },
    { label: 'Below 2.5', min: 0, max: 2.5 },
  ];

  const rangeCounts = new Map<string, number>();
  ranges.forEach((range) => rangeCounts.set(range.label, 0));

  products.forEach((product) => {
    if (product.rating) {
      const rate = product.rating.rate;
      const range = ranges.find((r) => rate >= r.min && rate < r.max);
      if (range) {
        const count = rangeCounts.get(range.label) || 0;
        rangeCounts.set(range.label, count + 1);
      }
    }
  });

  const total = products.length;
  const distribution: RatingDistribution[] = [];

  rangeCounts.forEach((count, range) => {
    const percentage = total > 0 ? Math.round((count / total) * 1000) / 10 : 0;
    distribution.push({
      range,
      count,
      percentage,
    });
  });

  return distribution.filter((d) => d.count > 0).reverse();
}

export function getTopCategories(
  products: Product[],
  limit = 5
): TopCategory[] {
  const distribution = calculateCategoryDistribution(products);
  return distribution.slice(0, limit);
}

export function getTotalProductsCount(products: Product[]): number {
  return products.length;
}

