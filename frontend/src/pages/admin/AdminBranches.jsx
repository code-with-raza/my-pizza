import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Phone, MapPin, Loader2, X, Check } from 'lucide-react';
import { fetchAdminBranches, updateAdminBranch } from '../../services/api';

export default function AdminBranches() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const { data: branches = [], isLoading } = useQuery({
    queryKey: ['admin-branches'],
    queryFn: fetchAdminBranches,
  });

  const openEdit = (branch) => {
    setEditing(branch._id);
    setForm({
      name: branch.name,
      address: branch.address,
      city: branch.city || 'Lahore',
      phoneOrder: branch.phones?.order || '',
      phoneBranch: branch.phones?.branch || '',
      isActive: branch.isActive,
    });
    setShowForm(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data) =>
      updateAdminBranch(editing, {
        name: data.name,
        address: data.address,
        city: data.city,
        phones: { order: data.phoneOrder, branch: data.phoneBranch },
        isActive: data.isActive,
      }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-branches'] }); setShowForm(false); },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-heading font-800 text-2xl text-white">Branches</h1>

      {isLoading ? (
        <div className="text-gray-500 text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches.map((branch, i) => (
            <motion.div
              key={branch._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card-dark border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-heading font-700 text-white text-lg">{branch.name}</h2>
                  <span className={branch.isActive ? 'badge-green mt-1' : 'badge-red mt-1'}>
                    {branch.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <button
                  onClick={() => openEdit(branch)}
                  className="p-2 text-gray-500 hover:text-brand-yellow transition-colors"
                  aria-label={`Edit ${branch.name}`}
                >
                  <Pencil size={18} />
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex gap-2 text-gray-300">
                  <MapPin size={14} className="text-brand-yellow mt-0.5 shrink-0" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex gap-2 text-gray-300">
                  <Phone size={14} className="text-brand-yellow mt-0.5 shrink-0" />
                  <div>
                    <div>Order: <a href={`tel:${branch.phones?.order}`} className="text-brand-yellow">{branch.phones?.order}</a></div>
                    <div>Branch: <a href={`tel:${branch.phones?.branch}`} className="text-brand-yellow">{branch.phones?.branch}</a></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
                <h2 className="font-heading font-700 text-white">Edit Branch</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }}
                className="p-6 space-y-4"
              >
                {[
                  { label: 'Branch Name', key: 'name', type: 'text' },
                  { label: 'Address', key: 'address', type: 'text' },
                  { label: 'City', key: 'city', type: 'text' },
                  { label: 'Order Phone', key: 'phoneOrder', type: 'tel' },
                  { label: 'Branch Phone', key: 'phoneBranch', type: 'tel' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-xs text-gray-400 mb-1">{label}</label>
                    <input
                      type={type}
                      className="input-field text-sm"
                      value={form[key] || ''}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-brand-yellow" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                  <span className="text-gray-300 text-sm">Active</span>
                </label>
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
