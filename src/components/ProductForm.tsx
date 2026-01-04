import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addProduct, updateProduct } from '@/services/api';

interface ProductFormProps {
  product: Product | null;
  onSuccess: (product: Product) => void;
  onClose: () => void;
  open: boolean;
}

export default function ProductForm({
  product,
  onSuccess,
  onClose,
  open,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        image: product.image,
      });
    } else {
      setFormData({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      });
    }
    setError('');
  }, [product, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
      };

      let response;
      if (product) {
        response = await updateProduct(product.id, productData);
      } else {
        response = await addProduct(productData);
      }

      onSuccess(response.data);
      onClose();
    } catch (err) {
      setError('Failed to save product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {product
              ? 'Update the product information below.'
              : 'Fill in the details to add a new product to the catalog.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Product title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                placeholder="e.g., electronics"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Product description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

