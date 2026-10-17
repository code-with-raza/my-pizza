import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';
import {
  fetchAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} from '../../services/api';

const EMPTY_FORM = { name: '', description: '', imageUrl: '', sortOrder: 0, isActive: true };

export default function AdminCategories() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: fetchAdminCategories,
  });

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (cat) => {
    setEditing(cat._id);
    setForm({ name: cat.name, description: cat.description || '', imageUrl: cat.imageUrl || '', sortOrder: cat.sortOrder || 0, isActive: cat.isActive });
    setShowForm(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data) => editing ? updateAdminCategory(editing, data) : createAdminCategory(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-categories'] }); setShowForm(false); },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminCategory,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-800 text-2xl text-white">Categories</h1>
        <button onClick={openCreate} className="btn-primary py-2.5 px-5 text-sm">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="card-dark border border-white/10 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <div className="divide-y divide-white/5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/5"
              >
                <div>
                  <div className="font-heading font-700 text-white">{cat.name}</div>
                  <div className="text-gray-500 text-xs">/{cat.slug} · Order: {cat.sortOrder}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cat.isActive ? 'badge-green' : 'badge-red'}>
                    {cat.isActive ? 'Active' : 'Hidden'}
                  </span>
                  <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-500 hover:text-brand-yellow">
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => window.confirm(`Delete "${cat.name}"?`) && deleteMutation.mutate(cat._id)}
                    className="p-1.5 text-gray-500 hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
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
                <h2 className="font-heading font-700 text-white">{editing ? 'Edit' : 'Add'} Category</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, sortOrder: Number(form.sortOrder) }); }} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name *</label>
                  <input className="input-field text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Description</label>
                  <input className="input-field text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Sort Order</label>
                    <input type="number" className="input-field text-sm" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-brand-yellow" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                      <span className="text-gray-300 text-sm">Active</span>
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
