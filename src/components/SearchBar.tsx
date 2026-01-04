import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBarProps {
  onSearch: (searchTerm: string, category: string) => void;
  categories: string[];
}

export default function SearchBar({ onSearch, categories }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Debounce search term with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Trigger search when debounced search term or category changes
  useEffect(() => {
    onSearch(debouncedSearchTerm, selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, selectedCategory]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category: string) => {
    const actualCategory = category === 'all' ? '' : category;
    setSelectedCategory(actualCategory);
  };

  const handleClear = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSelectedCategory('');
  };

  return (
    <div className="w-full space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-10 w-full"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="w-full md:w-[200px]">
        <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {(searchTerm || selectedCategory) && (
        <Button
          variant="outline"
          onClick={handleClear}
          className="w-full md:w-auto"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}

