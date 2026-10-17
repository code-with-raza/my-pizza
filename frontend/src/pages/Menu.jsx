import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCategories, fetchProducts } from '../services/api';
import ProductCard from '../components/menu/ProductCard';
import ProductModal from '../components/menu/ProductModal';
import { LoadingSkeleton } from '../components/common/UI';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategory = searchParams.get('category') || 'all';

  const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const { data: products = [], isLoading } = useQuery({ queryKey: ['products'], queryFn: () => fetchProducts({}) });

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter((p) => p.categoryId?.slug === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    return list;
  }, [products, activeCategory, searchQuery]);

  const handleCategoryChange = (slug) => setSearchParams(slug === 'all' ? {} : { category: slug });

  return (
    <>
      <title>Menu — My Pizza Lahore</title>
      <div className="min-h-screen bg-[#0e0c0c] pt-24 pb-20">
        <div className="max-w-7xl mx-auto container-px">

          {/* Page header */}
          <div className="mb-10">
            <span className="section-tag">🍽️ Full Menu</span>
            <h1 className="section-heading text-white mb-2">Our Menu</h1>
            <div className="glow-divider mx-0 mt-3" />
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="search"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-11"
              id="menu-search"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
            <button
              onClick={() => handleCategoryChange('all')}
              className={activeCategory === 'all' ? 'category-pill-active' : 'category-pill'}
              id="category-all"
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id || cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                className={activeCategory === cat.slug ? 'category-pill-active' : 'category-pill'}
                id={`category-${cat.slug}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Count */}
          {!isLoading && (
            <p className="text-gray-600 text-xs mb-6 uppercase tracking-wider">
              {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}
              {activeCategory !== 'all' && ` · ${categories.find((c) => c.slug === activeCategory)?.name || ''}`}
            </p>
          )}

          {/* Grid */}
          {isLoading ? (
            <LoadingSkeleton count={12} />
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-7xl mb-5">🔍</div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Nothing found</h3>
              <p className="text-gray-500">Try a different category or search term.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} onOpenModal={setSelectedProduct} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}
