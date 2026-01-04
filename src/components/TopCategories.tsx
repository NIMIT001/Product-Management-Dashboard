import { useMemo } from 'react';
import { getTopCategories } from '@/utils/analytics';
import type { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TopCategoriesProps {
  products: Product[];
  limit?: number;
}

export default function TopCategories({
  products,
  limit = 5,
}: TopCategoriesProps) {
  const topCategories = useMemo(
    () => getTopCategories(products, limit),
    [products, limit]
  );

  const maxCount = useMemo(() => {
    if (topCategories.length === 0) return 1;
    return Math.max(...topCategories.map((cat) => cat.count));
  }, [topCategories]);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No products to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topCategories.map((category, index) => (
        <div key={category.category} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="min-w-[24px] justify-center">
                {index + 1}
              </Badge>
              <span className="text-sm font-medium">{category.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {category.count} products
              </span>
              <span className="text-sm font-semibold text-primary">
                {category.percentage}%
              </span>
            </div>
          </div>
          <Progress value={(category.count / maxCount) * 100} />
        </div>
      ))}
    </div>
  );
}

