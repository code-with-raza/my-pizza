import axios from 'axios';
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  MOCK_DEALS,
  MOCK_BRANCHES,
} from '../data/mockData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 6000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mp_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Helper: try API, fall back to mock ─────────────────────────────────────
async function withFallback(apiFn, fallbackData) {
  try {
    return await apiFn();
  } catch {
    return fallbackData;
  }
}

// ─── Public ────────────────────────────────────────────────────────────────
export const fetchCategories = () =>
  withFallback(
    () => api.get('/categories').then((r) => r.data.data),
    MOCK_CATEGORIES
  );

export const fetchProducts = (params = {}) =>
  withFallback(async () => {
    const res = await api.get('/products', { params });
    return res.data.data;
  }, filterMockProducts(params));

export const fetchProductBySlug = (slug) =>
  withFallback(
    () => api.get(`/products/${slug}`).then((r) => r.data.data),
    MOCK_PRODUCTS.find((p) => p.slug === slug) || null
  );

export const fetchDeals = () =>
  withFallback(
    () => api.get('/deals').then((r) => r.data.data),
    MOCK_DEALS
  );

export const fetchBranches = () =>
  withFallback(
    () => api.get('/branches').then((r) => r.data.data),
    MOCK_BRANCHES
  );

export const createOrder = (data) =>
  api.post('/orders', data).then((r) => r.data.data);

export const fetchOrderByNumber = (orderNumber) =>
  api.get(`/orders/${orderNumber}`).then((r) => r.data.data);

// ─── Local mock filtering ────────────────────────────────────────────────────
function filterMockProducts(params = {}) {
  let list = [...MOCK_PRODUCTS];
  if (params.featured === 'true') {
    list = list.filter((p) => p.isFeatured);
  }
  if (params.category) {
    list = list.filter(
      (p) => p.categoryId?._id === params.category || p.categoryId?.slug === params.category
    );
  }
  return list;
}

// ─── Admin Auth ─────────────────────────────────────────────────────────────
export const adminLogin = (credentials) =>
  api.post('/admin/auth/login', credentials).then((r) => r.data);

export const adminLogout = () => api.post('/admin/auth/logout');

export const fetchAdminMe = () =>
  api.get('/admin/auth/me').then((r) => r.data.admin);

// ─── Admin Products ─────────────────────────────────────────────────────────
export const fetchAdminProducts = (params) =>
  api.get('/admin/products', { params }).then((r) => r.data);

export const createAdminProduct = (data) =>
  api.post('/admin/products', data).then((r) => r.data.data);

export const updateAdminProduct = (id, data) =>
  api.patch(`/admin/products/${id}`, data).then((r) => r.data.data);

export const deleteAdminProduct = (id) =>
  api.delete(`/admin/products/${id}`).then((r) => r.data);

// ─── Admin Categories ───────────────────────────────────────────────────────
export const fetchAdminCategories = () =>
  api.get('/admin/categories').then((r) => r.data.data);

export const createAdminCategory = (data) =>
  api.post('/admin/categories', data).then((r) => r.data.data);

export const updateAdminCategory = (id, data) =>
  api.patch(`/admin/categories/${id}`, data).then((r) => r.data.data);

export const deleteAdminCategory = (id) =>
  api.delete(`/admin/categories/${id}`).then((r) => r.data);

// ─── Admin Deals ────────────────────────────────────────────────────────────
export const fetchAdminDeals = () =>
  api.get('/admin/deals').then((r) => r.data.data);

export const createAdminDeal = (data) =>
  api.post('/admin/deals', data).then((r) => r.data.data);

export const updateAdminDeal = (id, data) =>
  api.patch(`/admin/deals/${id}`, data).then((r) => r.data.data);

export const deleteAdminDeal = (id) =>
  api.delete(`/admin/deals/${id}`).then((r) => r.data);

// ─── Admin Branches ─────────────────────────────────────────────────────────
export const fetchAdminBranches = () =>
  api.get('/admin/branches').then((r) => r.data.data);

export const updateAdminBranch = (id, data) =>
  api.patch(`/admin/branches/${id}`, data).then((r) => r.data.data);

// ─── Admin Orders ────────────────────────────────────────────────────────────
export const fetchAdminOrders = (params) =>
  api.get('/admin/orders', { params }).then((r) => r.data);

export const fetchAdminOrderById = (id) =>
  api.get(`/admin/orders/${id}`).then((r) => r.data.data);

export const updateAdminOrderStatus = (id, status) =>
  api.patch(`/admin/orders/${id}/status`, { status }).then((r) => r.data.data);

export default api;
