import axios from "axios";

// Khi có BE thật: đổi baseURL thành địa chỉ Order Service
const client = axios.create({
  baseURL: import.meta.env.VITE_ORDER_URL || "http://localhost:3002",
});

export const createOrder  = (payload) => client.post("/api/orders", payload);
export const getOrder     = (id)      => client.get(`/api/orders/${id}`);
export const processOrder = (id)      => client.put(`/api/orders/${id}/process`);