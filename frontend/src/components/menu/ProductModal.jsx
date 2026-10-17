import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import useCartStore from '../../store/cartStore';

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;

export default function ProductModal({ product, onClose }) {
  const addItem = useCartStore((s) => s.addItem);
  const hasVariants = product?.variants?.length > 0;
  const hasAddOns = product?.addOns?.filter((a) => a.isActive)?.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants[0] : null
  );
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const basePrice = selectedVariant ? selectedVariant.price : product.price || 0;
  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const addOn = product.addOns?.find((a) => a._id === id);
    return sum + (addOn?.price || 0);
  }, 0);
  const totalPrice = (basePrice + addOnTotal) * quantity;

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    addItem({
      sourceType: 'product',
      sourceId: product._id,
      name: product.name,
      imageUrl: product.imageUrl || null,
      variantCode: selectedVariant?.code || null,
      variantName: selectedVariant?.name || null,
      addOnIds: selectedAddOns,
      unitPrice: basePrice + addOnTotal,
      quantity,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="page-overlay" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div
          className="bg-gray-900 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 shrink-0">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">🍕</div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-gray-900/80 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">
            <div>
              <h2 className="font-heading font-800 text-2xl text-white mb-2">{product.name}</h2>
              {product.description && (
                <p className="text-gray-400 text-sm">{product.description}</p>
              )}
            </div>

            {/* Variants */}
            {hasVariants && (
              <div>
                <h3 className="font-heading font-700 text-white mb-3">Choose Size</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.code}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedVariant?.code === v.code
                          ? 'border-brand-yellow bg-brand-yellow/10'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="font-heading font-700 text-white text-sm">{v.name}</div>
                      <div className="text-brand-yellow font-bold">{formatPrice(v.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {hasAddOns && (
              <div>
                <h3 className="font-heading font-700 text-white mb-3">Add-ons</h3>
                <div className="space-y-2">
                  {product.addOns.filter((a) => a.isActive).map((addOn) => (
                    <label
                      key={addOn._id}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedAddOns.includes(addOn._id)
                          ? 'border-brand-yellow bg-brand-yellow/10'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="accent-brand-yellow"
                          checked={selectedAddOns.includes(addOn._id)}
                          onChange={() => toggleAddOn(addOn._id)}
                        />
                        <span className="text-white font-body">{addOn.name}</span>
                      </div>
                      <span className="text-brand-yellow font-semibold">+{formatPrice(addOn.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-900 border-t border-white/5 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-brand-yellow hover:text-brand-yellow transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="font-heading font-700 text-white text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-brand-yellow hover:text-brand-yellow transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="price-tag text-xl">{formatPrice(totalPrice)}</div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className={`w-full py-4 rounded-2xl font-heading font-700 text-lg flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : product.isAvailable
                  ? 'btn-primary w-full'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
              {added ? 'Added!' : product.isAvailable ? 'Add to Cart' : 'Unavailable'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
