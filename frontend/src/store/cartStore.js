import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      selectedBranchId: null,

      setSelectedBranch: (branchId) => set({ selectedBranchId: branchId }),

      addItem: (item) => {
        const { items } = get();
        // Key: sourceId + variantCode + sorted addOnIds
        const key = `${item.sourceId}-${item.variantCode || ''}-${(item.addOnIds || []).sort().join(',')}`;

        const existing = items.find((i) => i._key === key);
        if (existing) {
          set({
            items: items.map((i) =>
              i._key === key ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, _key: key }] });
        }
      },

      removeItem: (key) => {
        set({ items: get().items.filter((i) => i._key !== key) });
      },

      updateQuantity: (key, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((i) => i._key !== key) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i._key === key ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // Computed
      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
      },
    }),
    {
      name: 'mypizza-cart',
      partialize: (state) => ({
        items: state.items,
        selectedBranchId: state.selectedBranchId,
      }),
    }
  )
);

export default useCartStore;
