import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { fetchBranches, createOrder } from '../services/api';
import useCartStore from '../store/cartStore';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  fulfillment: z.enum(['delivery', 'pickup']),
  branchId: z.string().min(1, 'Please select a branch'),
  address: z.string().optional(),
  notes: z.string().optional(),
}).refine(
  (data) => data.fulfillment === 'pickup' || (data.address && data.address.length > 5),
  { message: 'Delivery address is required', path: ['address'] }
);

const formatPrice = (price) => `Rs. ${price?.toLocaleString('en-PK') ?? 0}`;

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const { data: branches = [] } = useQuery({
    queryKey: ['branches'],
    queryFn: fetchBranches,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { fulfillment: 'delivery' } });

  const fulfillment = watch('fulfillment');

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      clearCart();
      navigate(`/order/${order.orderNumber}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      branchId: data.branchId,
      customer: {
        name: data.name,
        phone: data.phone,
        address: data.address || '',
        notes: data.notes || '',
      },
      fulfillment: data.fulfillment,
      items: items.map((item) => ({
        sourceType: item.sourceType,
        sourceId: item.sourceId,
        quantity: item.quantity,
        variantCode: item.variantCode || null,
        addOnIds: item.addOnIds || [],
      })),
      paymentMethod: 'cash',
    };
    mutation.mutate(payload);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-black pt-24 pb-20">
      <div className="max-w-6xl mx-auto container-px">
        <h1 className="section-heading text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="card-dark border border-white/10 p-6 rounded-2xl">
              <h2 className="font-heading font-700 text-white text-lg mb-5">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                  <input id="name" {...register('name')} placeholder="Your name" className="input-field" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-400 mb-1.5">Phone Number *</label>
                  <input id="phone" {...register('phone')} placeholder="0300 0000000" className="input-field" type="tel" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Fulfillment */}
            <div className="card-dark border border-white/10 p-6 rounded-2xl">
              <h2 className="font-heading font-700 text-white text-lg mb-5">Delivery or Pickup?</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {['delivery', 'pickup'].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      fulfillment === type
                        ? 'border-brand-yellow bg-brand-yellow/10'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <input {...register('fulfillment')} type="radio" value={type} className="sr-only" />
                    <span className="text-2xl">{type === 'delivery' ? '🚗' : '🏪'}</span>
                    <span className="font-heading font-700 text-white capitalize">{type}</span>
                  </label>
                ))}
              </div>

              {fulfillment === 'delivery' && (
                <div>
                  <label htmlFor="address" className="block text-sm text-gray-400 mb-1.5">Delivery Address *</label>
                  <input
                    id="address"
                    {...register('address')}
                    placeholder="House/Block, Street, Area, City"
                    className="input-field"
                  />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>}
                </div>
              )}
            </div>

            {/* Branch Selection */}
            <div className="card-dark border border-white/10 p-6 rounded-2xl">
              <h2 className="font-heading font-700 text-white text-lg mb-5">Select Branch</h2>
              <div className="space-y-3">
                {branches.map((branch) => (
                  <label
                    key={branch._id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      watch('branchId') === branch._id
                        ? 'border-brand-yellow bg-brand-yellow/10'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <input {...register('branchId')} type="radio" value={branch._id} className="mt-1 accent-brand-yellow" />
                    <div>
                      <div className="font-heading font-700 text-white">{branch.name}</div>
                      <div className="text-gray-400 text-sm">{branch.address}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.branchId && <p className="text-red-400 text-xs mt-2">{errors.branchId.message}</p>}
            </div>

            {/* Notes */}
            <div className="card-dark border border-white/10 p-6 rounded-2xl">
              <label htmlFor="notes" className="block font-heading font-700 text-white text-lg mb-3">
                Special Instructions
              </label>
              <textarea
                id="notes"
                {...register('notes')}
                rows={3}
                placeholder="Any special requests or notes for your order..."
                className="input-field resize-none"
              />
            </div>

            {mutation.error && (
              <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {mutation.error.message}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={mutation.isPending}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full text-lg py-4 rounded-2xl justify-center"
              id="place-order-btn"
            >
              {mutation.isPending ? (
                <><Loader2 size={20} className="animate-spin" /> Placing Order...</>
              ) : (
                <>Place Order <ArrowRight size={20} /></>
              )}
            </motion.button>
          </form>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-dark border border-white/10 p-6 rounded-2xl sticky top-24">
              <h2 className="font-heading font-700 text-white text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item._key} className="flex justify-between gap-2 text-sm">
                    <div className="text-gray-300 flex-1 min-w-0">
                      <span className="text-gray-500">{item.quantity}x</span> {item.name}
                      {item.variantName && (
                        <span className="text-gray-500"> ({item.variantName})</span>
                      )}
                    </div>
                    <span className="text-white shrink-0">{formatPrice(item.unitPrice * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between font-heading font-700 text-white">
                <span>Total</span>
                <span className="text-brand-yellow">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-gray-600 text-xs mt-3">
                Payment: Cash on Delivery. Delivery fee confirmed by branch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
