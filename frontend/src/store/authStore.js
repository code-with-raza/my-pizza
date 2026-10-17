import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      admin: null,
      token: null,

      setAuth: (admin, token) => {
        localStorage.setItem('mp_admin_token', token);
        set({ admin, token });
      },

      clearAuth: () => {
        localStorage.removeItem('mp_admin_token');
        set({ admin: null, token: null });
      },

      get isAuthenticated() {
        return !!this.token;
      },
    }),
    {
      name: 'mypizza-auth',
      partialize: (state) => ({ admin: state.admin, token: state.token }),
    }
  )
);

export default useAuthStore;
