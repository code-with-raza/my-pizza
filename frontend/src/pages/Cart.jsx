import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import useCartStore from '../store/cartStore';

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-heading font-800 text-3xl text-white mb-3">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Browse our menu and add some delicious items!</p>
          <Link to="/menu" className="btn-primary text-lg px-8 py-4">
            Browse Menu <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-32 lg:pb-20">
      <div className="max-w-4xl mx-auto container-px">
        <div className="flex items-center justify-between mb-8">
          <h1 className="section-heading text-white">Your Cart</h1>
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-400 text-sm font-body flex items-center gap-1 transition-colors"
          >
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item._key}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="card-dark border border-white/10 p-4 sm:p-5 rounded-2xl"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-800 overflow-hidden shrink-0">
                    <img
                      src={item.imageUrl || '/pizza.jpg'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-700 text-white text-sm sm:text-base leading-tight mb-0.5">
                      {item.name}
                    </h3>
                    {item.variantName && (
                      <p className="text-gray-500 text-xs mb-1">Size: {item.variantName}</p>
                    )}
                    {item.addOnIds?.length > 0 && (
                      <p className="text-gray-500 text-xs mb-1">+ Add-ons</p>
                    )}
                    <div className="price-tag text-sm">{formatPrice(item.unitPrice)}</div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item._key)}
                      className="text-gray-600 hover:text-red-400 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._key, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:border-brand-yellow hover:text-brand-yellow transition-all text-xs"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-heading font-700 text-white w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._key, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-gray-700 flex items-center justify-center text-gray-300 hover:border-brand-yellow hover:text-brand-yellow transition-all text-xs"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="font-heading font-700 text-brand-yellow text-sm">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="mt-8 card-dark border border-white/10 p-6 rounded-2xl">
          <h2 className="font-heading font-700 text-white text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal ({items.length} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery Fee</span>
              <span className="text-gray-500">Calculated at checkout</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between font-heading font-700 text-white text-lg">
              <span>Total</span>
              <span className="text-brand-yellow">{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          <Link
            to="/checkout"
            className="btn-primary w-full text-lg py-4 rounded-2xl justify-center"
            id="proceed-checkout-btn"
          >
            Proceed to Checkout <ArrowRight size={20} />
          </Link>
          <Link
            to="/menu"
            className="block text-center text-gray-400 hover:text-white text-sm mt-4 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
