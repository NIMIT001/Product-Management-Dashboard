import type { Product } from '@/types/product';
import AnalyticsCard from './AnalyticsCard';
import MetricCard from './MetricCard';
import CategoryDistributionChart from './CategoryDistributionChart';
import RatingDistributionChart from './RatingDistributionChart';
import TopCategories from './TopCategories';
import { calculatePriceStats } from '@/utils/analytics';
import { Package, DollarSign, TrendingUp, Star } from 'lucide-react';

interface AnalyticsSectionProps {
  products: Product[];
}

export default function AnalyticsSection({ products }: AnalyticsSectionProps) {
  const priceStats = calculatePriceStats(products);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-6 mb-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Analytics</h2>
        <p className="text-muted-foreground">
          Overview of your product catalog insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Products */}
        <MetricCard
          title="Total Products"
          value={products.length}
          icon={Package}
          subtitle="Products in catalog"
        />

        {/* Average Price */}
        <MetricCard
          title="Average Price"
          value={formatPrice(priceStats.average)}
          icon={DollarSign}
          subtitle={`Min: ${formatPrice(priceStats.min)} | Max: ${formatPrice(priceStats.max)}`}
        />

        {/* Products with Ratings */}
        <MetricCard
          title="Rated Products"
          value={products.filter((p) => p.rating).length}
          icon={Star}
          subtitle={`${products.length > 0 ? Math.round((products.filter((p) => p.rating).length / products.length) * 100) : 0}% of products`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Chart */}
        <AnalyticsCard
          title="Category Distribution"
          subtitle="Products by category"
        >
          <CategoryDistributionChart products={products} />
        </AnalyticsCard>

        {/* Rating Distribution Chart */}
        <AnalyticsCard
          title="Rating Distribution"
          subtitle="Products by rating range"
        >
          <RatingDistributionChart products={products} />
        </AnalyticsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <AnalyticsCard
          title="Top Categories"
          subtitle="Most popular product categories"
        >
          <TopCategories products={products} limit={5} />
        </AnalyticsCard>

        {/* Price Statistics Detail */}
        <AnalyticsCard
          title="Price Statistics"
          subtitle="Detailed price analysis"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Average Price</p>
                <p className="text-2xl font-bold">{formatPrice(priceStats.average)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Minimum</p>
                <p className="text-xl font-semibold">{formatPrice(priceStats.min)}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Maximum</p>
                <p className="text-xl font-semibold">{formatPrice(priceStats.max)}</p>
              </div>
            </div>
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
}

