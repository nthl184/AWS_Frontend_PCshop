import { Link } from 'react-router-dom'
import { useCartStore } from '../store/CartStore'

export default function Navbar() {
  const items = useCartStore(s => s.items)
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: 56, background: '#0f172a',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ color: '#fff', fontWeight: 700, fontSize: 18, textDecoration: 'none' }}>
        ⚡ PC Shop
      </Link>

      <Link to="/cart" style={{ position: 'relative', color: '#fff', textDecoration: 'none', fontSize: 22 }}>
        🛒
        {totalItems > 0 && (
          <span style={{
            position: 'absolute', top: -6, right: -10,
            background: '#2563eb', color: '#fff',
            borderRadius: '50%', width: 18, height: 18,
            fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  )
}