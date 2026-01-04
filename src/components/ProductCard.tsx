import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Star } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  animationDelay?: number;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  animationDelay = 0,
}: ProductCardProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getAnimationClass = () => {
    if (!hasIntersected) return 'opacity-0';
    if (animationDelay === 0) return 'animate-fade-in-up';
    if (animationDelay === 1) return 'animate-fade-in-up-delay-1';
    if (animationDelay === 2) return 'animate-fade-in-up-delay-2';
    if (animationDelay === 3) return 'animate-fade-in-up-delay-3';
    return 'animate-fade-in-up';
  };

  return (
    <Card
      ref={elementRef}
      className={`flex flex-col h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden ${getAnimationClass()}`}
    >
      <div className="relative aspect-square w-full bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
          loading="lazy"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 capitalize"
        >
          {product.category}
        </Badge>
      </div>

      <CardHeader className="flex-1">
        <h3 className="font-semibold text-lg line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          {product.rating && (
            <>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">
                  {product.rating.rate.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating.count})
              </span>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {product.description}
        </p>
        <div className="text-2xl font-bold text-primary">
          {formatPrice(product.price)}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onEdit(product)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => onDelete(product.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

