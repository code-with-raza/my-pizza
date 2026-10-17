import { motion } from 'framer-motion';
import { ShoppingCart, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;



export default function DealCard({ deal }) {
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const BADGE_LABELS = { promotion: 'PROMO', combo: 'COMBO', family: 'FAMILY', deal: 'VALUE' };
  const badge = BADGE_LABELS[deal.type] || 'DEAL';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem({
      sourceType: 'deal',
      sourceId: deal._id,
      name: deal.name,
      variantCode: null,
      variantName: null,
      addOnIds: [],
      unitPrice: deal.price,
      quantity: 1,
    });
    navigate('/cart');
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="card group overflow-hidden relative"
    >
      {/* Header — food photo */}
      <div className="relative overflow-hidden" style={{ height: '160px' }}>
        <img
          src={deal.imageUrl || '/pizza.jpg'}
          alt={deal.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* No overlay — clean image */}

        <div className="relative z-10 p-6">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-heading font-bold px-2.5 py-1 rounded-full border border-white/20 tracking-widest">
              {badge}
            </span>
            {deal.type === 'promotion' && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="flex items-center gap-0.5 text-brand-yellow"
              >
                <Flame size={12} />
                <span className="text-[10px] font-bold">HOT</span>
              </motion.div>
            )}
          </div>

          <h3 className="font-heading font-extrabold text-xl text-white leading-tight mb-1">
            {deal.name}
          </h3>
          <div className="font-heading font-black text-3xl text-white/90 tracking-tight">
            {formatPrice(deal.price)}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{deal.description}</p>

        {deal.items?.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {deal.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-gray-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0" />
                {item.quantity > 1 && (
                  <span className="font-heading font-bold text-brand-yellow text-xs">{item.quantity}×</span>
                )}
                <span>{item.productNameSnapshot}</span>
              </li>
            ))}
          </ul>
        )}

        {deal.isAvailable ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className="btn-primary w-full justify-center"
          >
            <ShoppingCart size={16} />
            Order This Deal
          </motion.button>
        ) : (
          <div className="w-full py-3 text-center text-gray-600 border border-gray-800 rounded-full text-sm font-heading">
            Currently Unavailable
          </div>
        )}
      </div>
    </motion.div>
  );
}
