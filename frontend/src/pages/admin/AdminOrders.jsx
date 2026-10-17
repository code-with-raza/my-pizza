import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
  fetchAdminOrderById,
} from '../../services/api';

const STATUS_OPTIONS = [
  'pending', 'confirmed', 'preparing', 'ready',
  'out_for_delivery', 'completed', 'cancelled',
];

const STATUS_COLORS = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  preparing: 'bg-blue-500/20 text-blue-400',
  ready: 'bg-emerald-500/20 text-emerald-400',
  out_for_delivery: 'bg-orange-500/20 text-orange-400',
  completed: 'bg-green-700/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-400',
};

const formatPrice = (p) => `Rs. ${p?.toLocaleString('en-PK') ?? 0}`;

export default function AdminOrders() {
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', statusFilter],
    queryFn: () => fetchAdminOrders({ status: statusFilter || undefined, limit: 50 }),
  });

  const { data: orderDetail, isLoading: loadingDetail } = useQuery({
    queryKey: ['admin-order', selectedId],
    queryFn: () => fetchAdminOrderById(selectedId),
    enabled: !!selectedId,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateAdminOrderStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-orders'] });
      qc.invalidateQueries({ queryKey: ['admin-order', selectedId] });
    },
  });

  const orders = data?.orders || [];

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-800 text-2xl text-white">Orders</h1>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter('')}
          className={statusFilter === '' ? 'category-pill-active' : 'category-pill'}
        >
          All
        </button>
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={statusFilter === s ? 'category-pill-active' : 'category-pill'}
          >
            {s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card-dark border border-white/10 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Order</th>
                  <th className="text-left px-5 py-3">Customer</th>
                  <th className="text-left px-5 py-3 hidden sm:table-cell">Branch</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-right px-5 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => setSelectedId(order._id)}
                    className="hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4 font-heading font-700 text-white">{order.orderNumber}</td>
                    <td className="px-5 py-4 text-gray-300">{order.customer?.name}</td>
                    <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">{order.branchName}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${STATUS_COLORS[order.status] || 'badge-yellow'}`}>
                        {order.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-heading font-700 text-brand-yellow">
                      {formatPrice(order.pricing?.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-gray-900">
              <h2 className="font-heading font-700 text-white text-lg">
                {orderDetail?.orderNumber || 'Loading...'}
              </h2>
              <button onClick={() => setSelectedId(null)} className="text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {loadingDetail ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : orderDetail ? (
              <div className="p-6 space-y-5">
                {/* Customer */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-0.5">Customer</p>
                    <p className="text-white font-semibold">{orderDetail.customer?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Phone</p>
                    <a href={`tel:${orderDetail.customer?.phone}`} className="text-brand-yellow font-semibold">
                      {orderDetail.customer?.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Fulfillment</p>
                    <p className="text-white capitalize">{orderDetail.fulfillment}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Branch</p>
                    <p className="text-white">{orderDetail.branchName}</p>
                  </div>
                  {orderDetail.customer?.address && (
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-0.5">Delivery Address</p>
                      <p className="text-white">{orderDetail.customer.address}</p>
                    </div>
                  )}
                  {orderDetail.customer?.notes && (
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-0.5">Notes</p>
                      <p className="text-white">{orderDetail.customer.notes}</p>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">Items</p>
                  <div className="space-y-2">
                    {orderDetail.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-300">
                          {item.quantity}x {item.name}
                          {item.variantName && <span className="text-gray-500"> ({item.variantName})</span>}
                        </span>
                        <span className="text-white">{formatPrice(item.lineTotal)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 flex justify-between font-heading font-700 text-white">
                    <span>Total</span>
                    <span className="text-brand-yellow">{formatPrice(orderDetail.pricing?.total)}</span>
                  </div>
                </div>

                {/* Status Update */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-gray-400 text-sm mb-3">Update Status</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => statusMutation.mutate({ id: orderDetail._id, status: s })}
                        disabled={statusMutation.isPending || orderDetail.status === s}
                        className={`py-2 px-3 rounded-xl text-xs font-heading font-700 capitalize transition-all border ${
                          orderDetail.status === s
                            ? 'bg-brand-yellow/20 border-brand-yellow text-brand-yellow'
                            : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                        }`}
                      >
                        {statusMutation.isPending && orderDetail.status !== s ? (
                          <Loader2 size={12} className="animate-spin mx-auto" />
                        ) : (
                          s.replace(/_/g, ' ')
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </div>
  );
}
