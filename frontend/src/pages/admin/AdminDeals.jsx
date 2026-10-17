import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import {
  fetchAdminDeals,
  createAdminDeal,
  updateAdminDeal,
  deleteAdminDeal,
} from '../../services/api';

const EMPTY_FORM = { name: '', description: '', type: 'deal', price: '', isAvailable: true, sortOrder: 0 };
const formatPrice = (p) => `Rs. ${p?.toLocaleString('en-PK') ?? 0}`;

export default function AdminDeals() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: deals = [], isLoading } = useQuery({
    queryKey: ['admin-deals'],
    queryFn: fetchAdminDeals,
  });

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (deal) => {
    setEditing(deal._id);
    setForm({ name: deal.name, description: deal.description || '', type: deal.type, price: deal.price, isAvailable: deal.isAvailable, sortOrder: deal.sortOrder || 0 });
    setShowForm(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data) => editing ? updateAdminDeal(editing, data) : createAdminDeal(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-deals'] }); setShowForm(false); },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminDeal,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-deals'] }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-800 text-2xl text-white">Deals</h1>
        <button onClick={openCreate} className="btn-primary py-2.5 px-5 text-sm">
          <Plus size={16} /> Add Deal
        </button>
      </div>

      <div className="card-dark border border-white/10 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Deal</th>
                  <th className="text-left px-5 py-3">Type</th>
                  <th className="text-left px-5 py-3">Price</th>
                  <th className="text-center px-5 py-3">Available</th>
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {deals.map((deal) => (
                  <tr key={deal._id} className="hover:bg-white/5">
                    <td className="px-5 py-3">
                      <div className="font-heading font-700 text-white">{deal.name}</div>
                      <div className="text-gray-500 text-xs line-clamp-1">{deal.description}</div>
                    </td>
                    <td className="px-5 py-3"><span className="badge-yellow capitalize">{deal.type}</span></td>
                    <td className="px-5 py-3 text-brand-yellow font-semibold">{formatPrice(deal.price)}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={deal.isAvailable ? 'badge-green' : 'badge-red'}>
                        {deal.isAvailable ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(deal)} className="p-1.5 text-gray-500 hover:text-brand-yellow"><Pencil size={15} /></button>
                        <button onClick={() => window.confirm(`Delete "${deal.name}"?`) && deleteMutation.mutate(deal._id)} className="p-1.5 text-gray-500 hover:text-red-400"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 rounded-3xl w-full max-w-md border border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-heading font-700 text-white">{editing ? 'Edit' : 'Add'} Deal</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveMutation.mutate({ ...form, price: Number(form.price), sortOrder: Number(form.sortOrder) });
                }}
                className="p-6 space-y-4"
              >
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name *</label>
                  <input className="input-field text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Description</label>
                  <textarea rows={2} className="input-field text-sm resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Type</label>
                    <select className="input-field text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                      {['combo', 'family', 'deal', 'promotion'].map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Price (Rs.) *</label>
                    <input type="number" className="input-field text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Sort Order</label>
                    <input type="number" className="input-field text-sm" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-brand-yellow" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
                      <span className="text-gray-300 text-sm">Available</span>
                    </label>
                  </div>
                </div>
                {saveMutation.error && <p className="text-red-400 text-xs">{saveMutation.error.message}</p>}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)} className="btn-ghost flex-1 border border-gray-700 rounded-xl">Cancel</button>
                  <button type="submit" disabled={saveMutation.isPending} className="btn-primary flex-1 justify-center">
                    {saveMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
