import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, Clock, Loader2, ArrowRight } from 'lucide-react';
import { fetchOrderByNumber } from '../services/api';

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;

const STATUS_CONFIG = {
  pending: { label: 'Order Placed', icon: '⏳', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  confirmed: { label: 'Confirmed', icon: '✅', color: 'text-green-400', bg: 'bg-green-500/10' },
  preparing: { label: 'Being Prepared', icon: '👨‍🍳', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ready: { label: 'Ready!', icon: '🎉', color: 'text-green-400', bg: 'bg-green-500/10' },
  out_for_delivery: { label: 'On the Way!', icon: '🛵', color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' },
  completed: { label: 'Delivered!', icon: '🎊', color: 'text-green-400', bg: 'bg-green-500/10' },
  cancelled: { label: 'Cancelled', icon: '❌', color: 'text-red-400', bg: 'bg-red-500/10' },
};

export default function OrderStatus() {
  const { orderNumber } = useParams();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderNumber],
    queryFn: () => fetchOrderByNumber(orderNumber),
    refetchInterval: 30000, // Poll every 30s
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-brand-yellow mx-auto mb-4" />
          <p className="text-gray-400">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-brand-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-heading font-700 text-xl text-white mb-2">Order not found</h2>
          <p className="text-gray-400 mb-6">{error.message}</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto container-px">
        {/* Confirmation Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-10"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 text-5xl">
            {statusConfig.icon}
          </div>
          <h1 className="font-heading font-900 text-3xl sm:text-4xl text-white mb-2">
            Order Placed!
          </h1>
          <p className="text-gray-400">Thanks {order.customer.name}! Your order is being processed.</p>
        </motion.div>

        {/* Order Number */}
        <div className="card-dark border border-white/10 p-6 rounded-2xl mb-4 text-center">
          <p className="text-gray-500 text-sm mb-1">Order Number</p>
          <p className="font-heading font-900 text-3xl text-brand-yellow tracking-wider">{order.orderNumber}</p>
        </div>

        {/* Status */}
        <div className={`${statusConfig.bg} border border-white/10 p-4 rounded-2xl mb-4 flex items-center gap-3`}>
          <span className="text-2xl">{statusConfig.icon}</span>
          <div>
            <p className="text-gray-400 text-xs">Status</p>
            <p className={`font-heading font-700 ${statusConfig.color}`}>{statusConfig.label}</p>
          </div>
          <Clock size={14} className="ml-auto text-gray-600" />
          <p className="text-gray-600 text-xs">Auto-refreshing</p>
        </div>

        {/* Order Details */}
        <div className="card-dark border border-white/10 p-6 rounded-2xl mb-4 space-y-4">
          <h2 className="font-heading font-700 text-white">Order Details</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Branch</p>
              <p className="text-white font-semibold">{order.branchName}</p>
            </div>
            <div>
              <p className="text-gray-500">Fulfillment</p>
              <p className="text-white font-semibold capitalize">{order.fulfillment}</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <h3 className="text-gray-400 text-sm mb-3">Items</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.quantity}x {item.name}
                    {item.variantName && <span className="text-gray-500"> ({item.variantName})</span>}
                  </span>
                  <span className="text-white">{formatPrice(item.lineTotal)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-1 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span><span>{formatPrice(order.pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery Fee</span>
              <span>{order.pricing.deliveryFee > 0 ? formatPrice(order.pricing.deliveryFee) : 'TBD'}</span>
            </div>
            <div className="flex justify-between font-heading font-700 text-white text-base pt-1 border-t border-white/5">
              <span>Total</span>
              <span className="text-brand-yellow">{formatPrice(order.pricing.total)}</span>
            </div>
          </div>
        </div>

        {/* Branch Contact */}
        <div className="card-dark border border-white/10 p-5 rounded-2xl mb-6">
          <p className="text-gray-400 text-sm mb-3">Questions about your order? Call us:</p>
          <div className="flex gap-3">
            <a href="tel:03099408899" className="btn-secondary text-sm py-2.5 px-4 flex-1 justify-center">
              <Phone size={14} /> Wasan Pura
            </a>
            <a href="tel:03174544884" className="btn-secondary text-sm py-2.5 px-4 flex-1 justify-center">
              <Phone size={14} /> Riwaz Garden
            </a>
          </div>
        </div>

        <Link to="/menu" className="btn-outline w-full justify-center">
          Order More <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
