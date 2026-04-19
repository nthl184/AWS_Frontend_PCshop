import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/CartStore'
import { createOrder } from '../api/orderAPI'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const navigate = useNavigate()

  const [form, setForm]       = useState({ name: '', phone: '', address: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError(null)

    const payload = {
      customer: form,
      // Frontend chỉ gửi items + total lên Order Service
      // Order Service sẽ tự gọi Product Service để check stock và trừ stock
      items: items.map(i => ({
        productId: i.id,
        name:      i.name,
        qty:       i.qty,
        price:     i.price
      })),
      total
    }

    try {
      const { data } = await createOrder(payload)
      // Order Service returns { orderId, status: 'created' }
      clearCart()
      navigate(`/order-success?orderId=${data.orderId}`)
    } catch (err) {
      // Order Service returns error when Product Service reports out of stock
      // err.response.data.message = 'Product X is out of stock'
      const msg = err.response?.data?.message || 'Failed to place order, please try again later'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: 24 }}>
      <h2>Checkout</h2>

      {['name', 'phone', 'address'].map(field => (
        <div key={field} style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', marginBottom: 4, fontSize: 14, color: '#555' }}>
            {{ name: 'Name', phone: 'Phone', address: 'Address' }[field]}
          </label>
          <input
            name={field} value={form[field]} onChange={handleChange}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8,
              border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
      ))}

      <div style={{ background: '#f8f8f8', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <h4 style={{ marginBottom: 8 }}>Order Summary</h4>
        {items.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
            <span>{i.name} × {i.qty}</span>
            <span>{(i.price * i.qty).toLocaleString('vi-VN')}₫</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #eee', marginTop: 8, paddingTop: 8,
          display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
          <span>Total</span>
          <span>{total.toLocaleString('vi-VN')}₫</span>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fff0f0', border: '1px solid #fca5a5',
          borderRadius: 8, padding: 12, marginBottom: 14, color: '#b91c1c', fontSize: 14 }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit} disabled={loading}
        style={{ width: '100%', padding: '12px 0', background: loading ? '#aaa' : '#2563eb',
          color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>
    </div>
  )
}