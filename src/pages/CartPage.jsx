import { fmt } from "../constants";
import { useCart } from "../store/CartStore";
import CartItem from "../components/CartItem";

export default function CartPage({ onNavigate }) {
  const { cart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
        <p style={{ fontSize: 16, marginBottom: 20 }}>Giỏ hàng trống</p>
        <button
          onClick={() => onNavigate("home")}
          style={{
            padding: "10px 28px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "#0f172a" }}>
        Your Shopping Cart
      </h2>

      {/* List of products */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Total + actions */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          padding: "20px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontSize: 14,
            color: "#64748b",
          }}
        >
          <span>Subtotal ({totalItems} items)</span>
          <span>{fmt(totalPrice)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontSize: 14,
            color: "#64748b",
          }}
        >
          <span>Shipping Fee</span>
          <span style={{ color: "#16a34a" }}>Free</span>
        </div>
        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            marginTop: 12,
            paddingTop: 12,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 17 }}>Total</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: "#1d4ed8" }}>
            {fmt(totalPrice)}
          </span>
        </div>

        <button
          onClick={() => onNavigate("checkout")}
          style={{
            marginTop: 16,
            width: "100%",
            padding: "13px 0",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Place Order →
        </button>
        <button
          onClick={() => onNavigate("home")}
          style={{
            marginTop: 8,
            width: "100%",
            padding: "10px 0",
            background: "#f1f5f9",
            color: "#475569",
            border: "none",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ← Continue shopping
        </button>
      </div>
    </div>
  );
}