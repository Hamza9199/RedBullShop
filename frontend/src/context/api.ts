import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/server';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUser = (id: string) => api.get(`/korisnik/${id}`);
export const fetchUsers = () => api.get('/korisnici');
export const updateUser = (id: string, data: unknown) => api.put(`/korisnik/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/korisnik/${id}`);

export const fetchProducts = () => api.get('/proizvodi');
export const fetchProduct = (id: string) => api.get(`/proizvod/${id}`);
export const createProduct = (data: unknown) => api.post('/proizvod', data);
export const updateProduct = (id: string, data: unknown) => api.put(`/proizvod/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/proizvod/${id}`);

export const fetchAddresses = () => api.get('/adrese');
export const fetchAddress = (id: string) => api.get(`/adresa/${id}`);
export const createAddress = (data: unknown) => api.post('/adresa', data);
export const updateAddress = (id: string, data: unknown) => api.put(`/adresa/${id}`, data);
export const deleteAddress = (id: string) => api.delete(`/adresa/${id}`);

export const fetchCart = () => api.get('/korpa');
export const createCart = (data: unknown) => api.post('/korpa', data);
export const updateCart = (data: unknown) => api.put('/korpa', data);
export const deleteCartItem = (productId: string) => api.put(`/korpa/obrisi-proizvod/${productId}`);
