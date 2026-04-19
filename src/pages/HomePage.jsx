import { useEffect, useState } from 'react'
import { getProducts } from '../api/productAPI'
import { useCartStore } from '../store/CartStore'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => setError('Error fetching products'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  if (error)   return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20, padding: 24 }}>
      {products.map(p => (
        <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 10, padding: 16 }}>
          <img src={p.image} alt={p.name} style={{ width: '100%', borderRadius: 6 }} />
          <h3>{p.name}</h3>
          <p style={{ color: '#888', fontSize: 13 }}>{p.category}</p>
          <p style={{ fontWeight: 600 }}>{p.price.toLocaleString('vi-VN')}₫</p>
          <p style={{ fontSize: 13, color: p.stock > 0 ? 'green' : 'red' }}>
            {p.stock > 0 ? `Have ${p.stock} items` : 'Out of stock'}
          </p>
          <button
            onClick={() => addItem(p)}
            disabled={p.stock === 0}
            style={{ marginTop: 8, width: '100%', padding: '8px 0', borderRadius: 6,
              background: p.stock > 0 ? '#2563eb' : '#ccc', color: '#fff', border: 'none', cursor: p.stock > 0 ? 'pointer' : 'not-allowed' }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}