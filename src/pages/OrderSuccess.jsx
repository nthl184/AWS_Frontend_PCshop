import { Link, useSearchParams } from 'react-router-dom'

export default function OrderSuccess() {
  const [params] = useSearchParams()
  const orderId = params.get('orderId')

  return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <div style={{ fontSize: 64 }}>✅</div>
      <h2>Order placed successfully!</h2>
      <p style={{ color: '#555' }}>Order ID: <strong>{orderId}</strong></p>
      <p style={{ color: '#888', fontSize: 14 }}>We will contact you to confirm within 30 minutes.</p>
      <Link to="/">
        <button style={{ marginTop: 20, padding: '10px 28px', background: '#2563eb',
          color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Continue Shopping
        </button>
      </Link>
    </div>
  )
}