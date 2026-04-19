import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_URL || 'http://localhost:3001'
})

export const getProducts   = ()          => client.get('/api/products')
export const getProductById = (id)       => client.get(`/api/products/${id}`)