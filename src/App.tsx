import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from './services/api';
import type { Product } from './types/product';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import DeleteModal from './components/DeleteModal';
import AnalyticsSection from './components/AnalyticsSection';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string, category: string) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    setFilteredProducts(filtered);
  };

  const handleDeleteClick = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductToDelete(product);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
      setProducts(updatedProducts);
      setFilteredProducts(filteredProducts.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormSuccess = (product: Product) => {
    if (editingProduct) {
      const updated = products.map((p) => (p.id === product.id ? product : p));
      setProducts(updated);
      setFilteredProducts(updated);
    } else {
      setProducts([product, ...products]);
      setFilteredProducts([product, ...filteredProducts]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b mb-8 ">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog with ease
          </p>
        </div>
      </header>
      <div className="container mx-auto px-4  max-w-7xl">

        <AnalyticsSection products={products} />

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
            <div className="flex-1 w-full">
              <SearchBar onSearch={handleSearch} categories={categories} />
            </div>
            <Button onClick={handleAddNew} className="w-full sm:w-auto shrink-0 h-10">
              <Plus className="h-4 w-4 mr-0.5" />
              Add Product
            </Button>
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          {loading ? (
            'Loading products...'
          ) : (
            <>
              Showing {filteredProducts.length} of {products.length} products
            </>
          )}
        </div>

        <ProductList
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          loading={loading}
        />

        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onClose={handleFormClose}
          open={showForm}
        />

        <DeleteModal
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setProductToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
          productTitle={productToDelete?.title}
        />
      </div>
    </div>
  );
}

export default App;
