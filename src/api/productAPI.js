import axios from "axios";
import { MOCK_PRODUCTS } from '../data/mock';
// Khi có BE thật: đổi baseURL thành địa chỉ Product Service
const client = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_URL || "http://localhost:3001",
});

export const getProducts    = ()         => client.get("/products");
export const getProductById = (id)       => client.get(`/products/${id}`);
export const createProduct  = (data)     => client.post("/products", data);
export const updateProduct  = (id, data) => client.put(`/products/${id}`, data);
export const deleteProduct  = (id)       => client.delete(`/products/${id}`);
export const patchStock     = (id, stock)=> client.patch(`/products/${id}`, { stock });