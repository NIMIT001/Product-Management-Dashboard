import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = () => axios.get<Product[]>(API_URL);

export const addProduct = (product: Omit<Product, 'id'>) => 
  axios.post<Product>(API_URL, product);

export const updateProduct = (id: number, product: Partial<Product>) => 
  axios.put<Product>(`${API_URL}/${id}`, product);

export const deleteProduct = (id: number) => 
  axios.delete(`${API_URL}/${id}`);

