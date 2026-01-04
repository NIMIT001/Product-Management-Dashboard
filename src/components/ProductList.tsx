import type { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
  loading = false,
}: ProductListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <div className="flex gap-2 pt-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">📦</div>
          <h3 className="text-2xl font-semibold">No products found</h3>
          <p className="text-muted-foreground max-w-md">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          animationDelay={index % 4}
        />
      ))}
    </div>
  );
}

