import { fmt } from "../constants";
import { useCart } from "../store/CartStore";

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <img
        src={item.product_image}
        alt={item.name}
        style={{ width: 72, height: 52, objectFit: "cover", borderRadius: 8 }}
      />

      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", marginBottom: 2 }}>
          {item.name}
        </p>
        <p style={{ fontSize: 13, color: "#64748b" }}>{fmt(item.price)} / cái</p>
      </div>

      {/* Qty controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => dispatch({ type: "SET_QTY", id: item.id, qty: item.qty - 1 })}
          style={{
            width: 30, height: 30, borderRadius: 6,
            border: "1px solid #e2e8f0", background: "#f8fafc",
            cursor: "pointer", fontSize: 16,
          }}
        >
          −
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, minWidth: 24, textAlign: "center" }}>
          {item.qty}
        </span>
        <button
          onClick={() => dispatch({ type: "SET_QTY", id: item.id, qty: item.qty + 1 })}
          style={{
            width: 30, height: 30, borderRadius: 6,
            border: "1px solid #e2e8f0", background: "#f8fafc",
            cursor: "pointer", fontSize: 16,
          }}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <span
        style={{
          fontWeight: 700, fontSize: 15, color: "#1d4ed8",
          minWidth: 100, textAlign: "right",
        }}
      >
        {fmt(item.price * item.qty)}
      </span>

      {/* Remove */}
      <button
        onClick={() => dispatch({ type: "REMOVE", id: item.id })}
        style={{
          background: "none", border: "none",
          cursor: "pointer", color: "#dc2626", fontSize: 18, padding: "4px 8px",
        }}
      >
        ✕
      </button>
    </div>
  );
}