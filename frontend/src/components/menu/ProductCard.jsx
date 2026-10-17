import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import useCartStore from '../../store/cartStore';

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;

const CATEGORY_EMOJIS = {
  pizza: '🍕',
  'from-the-fryer': '🍔',
  'roll-and-wrap': '🌯',
  'grill-corner': '🔥',
  sandwich: '🥪',
  'potato-corner': '🍟',
  pasta: '🍝',
  beverages: '🥤',
};



export default function ProductCard({ product, onOpenModal }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const hasVariants = product.variants?.length > 0;
  const basePrice = hasVariants
    ? Math.min(...product.variants.map((v) => v.price))
    : product.price;
  const catSlug = product.categoryId?.slug || '';
  const emoji = CATEGORY_EMOJIS[catSlug] || '🍽️';

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    if (hasVariants || product.addOns?.length > 0) {
      onOpenModal?.(product);
      return;
    }
    addItem({
      sourceType: 'product',
      sourceId: product._id,
      name: product.name,
      imageUrl: product.imageUrl || null,
      variantCode: null,
      variantName: null,
      addOnIds: [],
      unitPrice: product.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card group cursor-pointer select-none relative overflow-hidden"
      onClick={() => onOpenModal?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpenModal?.(product)}
      aria-label={`View ${product.name}`}
    >
      {/* Card shine overlay */}
      <div className="absolute inset-0 bg-card-shine pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image area */}
      <div className="relative h-40 sm:h-44 bg-[#1a1614] overflow-hidden">
        <img
          src={product.imageUrl || '/pizza.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-20">
          {product.isFeatured && (
            <span className="inline-flex items-center gap-1 bg-brand-yellow text-brand-black text-[10px] font-heading font-bold px-2 py-0.5 rounded-full shadow">
              <Star size={8} fill="currentColor" /> Featured
            </span>
          )}
          {!product.isAvailable && (
            <span className="badge bg-gray-900/90 text-gray-400 text-[10px]">Unavailable</span>
          )}
        </div>

        {/* Size count badge */}
        {hasVariants && (
          <div className="absolute top-2.5 right-2.5 z-20">
            <span className="bg-black/60 backdrop-blur-sm text-gray-200 text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full border border-white/10">
              {product.variants.length} sizes
            </span>
          </div>
        )}

        {/* Bottom gradient to card */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1a1614] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 pt-3">
        <h3 className="font-heading font-bold text-white text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-brand-yellow/90 transition-colors duration-200">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-600 text-[11px] mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {hasVariants && (
              <span className="text-gray-600 text-[10px]">from</span>
            )}
            <span className="font-heading font-bold text-brand-yellow text-sm">
              {formatPrice(basePrice)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleQuickAdd}
            disabled={!product.isAvailable}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all duration-200 shrink-0 ${
              added
                ? 'bg-green-500 text-white shadow-[0_0_16px_rgba(34,197,94,0.4)]'
                : product.isAvailable
                ? 'bg-brand-yellow text-brand-black hover:shadow-glow-yellow hover:scale-110'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <span className="text-sm">✓</span>
            ) : (
              <Plus size={17} />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
