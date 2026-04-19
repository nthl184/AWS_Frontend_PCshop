import { Link } from 'react-router-dom'
import { useCartStore } from '../store/CartStore'

export default function CartPage() {
  const { items, removeItem, updateQty, total } = useCartStore()

  if (items.length === 0)
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>Cart is empty.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    )

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Cart</h2>
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16,
          borderBottom: '1px solid #eee', padding: '12px 0' }}>
          <img src={item.image} alt={item.name} style={{ width: 64, borderRadius: 6 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 500 }}>{item.name}</p>
            <p>{item.price.toLocaleString('vi-VN')}₫</p>
          </div>
          <input
            type="number" min={1} value={item.qty}
            onChange={e => updateQty(item.id, Number(e.target.value))}
            style={{ width: 56, padding: '4px 8px', borderRadius: 6, border: '1px solid #ddd' }}
          />
          <button onClick={() => removeItem(item.id)}
            style={{ background: 'none', border: 'none', color: '#e55', cursor: 'pointer', fontSize: 18 }}>
            ✕
          </button>
        </div>
      ))}

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <p style={{ fontSize: 18, fontWeight: 600 }}>
          Total: {total.toLocaleString('vi-VN')}₫
        </p>
        <Link to="/checkout">
          <button style={{ marginTop: 12, padding: '10px 32px', background: '#2563eb',
            color: '#fff', borderRadius: 8, border: 'none', fontSize: 15, cursor: 'pointer' }}>
            Place Order →
          </button>
        </Link>
      </div>
    </div>
  )
}