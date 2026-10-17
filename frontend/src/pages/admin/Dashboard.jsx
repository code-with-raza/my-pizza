import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle, TrendingUp, Package } from 'lucide-react';
import { fetchAdminOrders } from '../../services/api';
import { Link } from 'react-router-dom';

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;

const STATUS_LABELS = {
  pending: { label: 'Pending', color: 'badge-yellow' },
  confirmed: { label: 'Confirmed', color: 'badge-green' },
  preparing: { label: 'Preparing', color: 'bg-blue-500/20 text-blue-400' },
  ready: { label: 'Ready', color: 'badge-green' },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-500/20 text-orange-400' },
  completed: { label: 'Completed', color: 'badge-green' },
  cancelled: { label: 'Cancelled', color: 'badge-red' },
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', {}],
    queryFn: () => fetchAdminOrders({ limit: 5 }),
  });

  const { data: pendingData } = useQuery({
    queryKey: ['admin-orders', 'pending'],
    queryFn: () => fetchAdminOrders({ status: 'pending', limit: 1 }),
  });

  const orders = data?.orders || [];
  const totalOrders = data?.total || 0;
  const pendingCount = pendingData?.total || 0;

  const stats = [
    { label: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' },
    { label: 'Pending', value: pendingCount, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Today\'s Revenue', value: '—', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Active Menu Items', value: '—', icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-800 text-2xl sm:text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card-dark border border-white/10 p-5 rounded-2xl"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className={`font-heading font-800 text-2xl ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-gray-500 text-xs">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card-dark border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="font-heading font-700 text-white">Recent Orders</h2>
          <Link to="/admin/orders" className="text-brand-yellow hover:text-brand-yellow-light text-sm font-semibold transition-colors">
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingBag size={32} className="text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {orders.map((order) => {
              const sc = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
              return (
                <Link
                  key={order._id}
                  to={`/admin/orders/${order._id}`}
                  className="flex items-center justify-between p-4 sm:p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-700 text-white text-sm">{order.orderNumber}</div>
                    <div className="text-gray-500 text-xs">{order.customer?.name} · {order.branchName}</div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    <span className={`badge ${sc.color} hidden sm:inline-flex`}>{sc.label}</span>
                    <span className="font-heading font-700 text-brand-yellow text-sm">
                      {formatPrice(order.pricing?.total)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { to: '/admin/products', label: 'Manage Products', emoji: '📦' },
          { to: '/admin/deals', label: 'Manage Deals', emoji: '🎯' },
          { to: '/admin/branches', label: 'Manage Branches', emoji: '📍' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="card-dark border border-white/10 p-5 rounded-2xl hover:border-brand-yellow/30 transition-all text-center group"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
            <div className="font-heading font-700 text-white text-sm">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
