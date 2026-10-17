import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, X, ToggleLeft, ToggleRight } from 'lucide-react';
import {
  fetchAdminProducts,
  fetchAdminCategories,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from '../../services/api';

const formatPrice = (p) => `Rs. ${p?.toLocaleString('en-PK') ?? 0}`;
const EMPTY_FORM = {
  name: '', categoryId: '', description: '', price: '', imageUrl: '',
  isAvailable: true, isFeatured: false, sortOrder: 0, variants: [], addOns: [],
};

export default function AdminProducts() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [catFilter, setCatFilter] = useState('');

  const { data: pData, isLoading } = useQuery({
    queryKey: ['admin-products', catFilter],
    queryFn: () => fetchAdminProducts({ category: catFilter || undefined, limit: 200 }),
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: fetchAdminCategories,
  });

  const products = pData?.data || [];

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      categoryId: product.categoryId?._id || product.categoryId,
      description: product.description || '',
      price: product.price ?? '',
      imageUrl: product.imageUrl || '',
      isAvailable: product.isAvailable,
      isFeatured: product.isFeatured,
      sortOrder: product.sortOrder || 0,
      variants: product.variants || [],
      addOns: product.addOns || [],
    });
    setShowForm(true);
  };

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editing ? updateAdminProduct(editing, data) : createAdminProduct(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-products'] });
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const toggleAvailability = (product) => {
    updateAdminProduct(product._id, { isAvailable: !product.isAvailable })
      .then(() => qc.invalidateQueries({ queryKey: ['admin-products'] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: form.price === '' ? null : Number(form.price),
      sortOrder: Number(form.sortOrder),
    };
    saveMutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-800 text-2xl text-white">Products</h1>
        <button onClick={openCreate} className="btn-primary py-2.5 px-5 text-sm">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setCatFilter('')}
          className={catFilter === '' ? 'category-pill-active' : 'category-pill'}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setCatFilter(cat._id)}
            className={catFilter === cat._id ? 'category-pill-active' : 'category-pill'}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="card-dark border border-white/10 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Product</th>
                  <th className="text-left px-5 py-3 hidden sm:table-cell">Category</th>
                  <th className="text-left px-5 py-3">Price</th>
                  <th className="text-center px-5 py-3">Available</th>
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-heading font-700 text-white">{product.name}</div>
                      {product.isFeatured && (
                        <span className="badge-yellow text-[10px]">Featured</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-400 hidden sm:table-cell">
                      {product.categoryId?.name}
                    </td>
                    <td className="px-5 py-3 text-brand-yellow font-semibold">
                      {product.variants?.length > 0
                        ? `From ${formatPrice(Math.min(...product.variants.map((v) => v.price)))}`
                        : formatPrice(product.price)}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => toggleAvailability(product)}
                        className={product.isAvailable ? 'text-green-400' : 'text-gray-600'}
                        aria-label={`Toggle availability for ${product.name}`}
                      >
                        {product.isAvailable ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="p-1.5 text-gray-500 hover:text-brand-yellow transition-colors"
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${product.name}"?`)) {
                              deleteMutation.mutate(product._id);
                            }
                          }}
                          className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                          aria-label={`Delete ${product.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 bg-black/70 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 rounded-3xl w-full max-w-lg border border-white/10"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-heading font-700 text-white">
                  {editing ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Name *</label>
                    <input
                      className="input-field text-sm"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Category *</label>
                    <select
                      className="input-field text-sm"
                      value={form.categoryId}
                      onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Price (single)</label>
                    <input
                      type="number"
                      className="input-field text-sm"
                      placeholder="0"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      className="input-field text-sm resize-none"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Image URL</label>
                    <input
                      className="input-field text-sm"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Sort Order</label>
                    <input
                      type="number"
                      className="input-field text-sm"
                      value={form.sortOrder}
                      onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-3 pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-brand-yellow"
                        checked={form.isAvailable}
                        onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                      />
                      <span className="text-gray-300 text-sm">Available</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-brand-yellow"
                        checked={form.isFeatured}
                        onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                      />
                      <span className="text-gray-300 text-sm">Featured</span>
                    </label>
                  </div>
                </div>

                {saveMutation.error && (
                  <p className="text-red-400 text-xs">{saveMutation.error.message}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-ghost flex-1 border border-gray-700 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveMutation.isPending}
                    className="btn-primary flex-1 justify-center"
                  >
                    {saveMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    Save
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
