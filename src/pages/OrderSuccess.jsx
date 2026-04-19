import { fmt } from "../db";

export default function OrderSuccessPage({ orderState, onNavigate }) {
  if (!orderState) return null;
  const { orderId, customer, items, total } = orderState;

  return (
    <div style={{ maxWidth: 560, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #e2e8f0",
          padding: "48px 40px",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
          Order Placed Successfully!
        </h2>
        <p style={{ color: "#64748b", marginBottom: 4 }}>Order ID:</p>
        <div
          style={{
            display: "inline-block",
            background: "#eff6ff",
            color: "#1d4ed8",
            fontWeight: 800,
            fontSize: 20,
            padding: "8px 24px",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          {orderId}
        </div>

        {/* Delivery Information */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 16,
            textAlign: "left",
          }}
        >
          <p style={{ fontSize: 13, color: "#475569", marginBottom: 8, fontWeight: 600 }}>
            Delivery Address:
          </p>
          <p style={{ fontSize: 14, color: "#0f172a", fontWeight: 600 }}>{customer.name}</p>
          <p style={{ fontSize: 13, color: "#64748b" }}>{customer.phone}</p>
          <p style={{ fontSize: 13, color: "#64748b" }}>{customer.address}</p>
        </div>

        {/* Order Details */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 20,
            textAlign: "left",
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 10 }}>
            Products Purchased:
          </p>
          {items.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}
            >
              <span style={{ color: "#374151" }}>
                {item.name} × {item.qty}
              </span>
              <span style={{ color: "#1d4ed8", fontWeight: 600 }}>
                {fmt(item.price * item.qty)}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: "1px solid #e2e8f0",
              marginTop: 8,
              paddingTop: 8,
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            <span>Total</span>
            <span style={{ color: "#1d4ed8" }}>{fmt(total)}</span>
          </div>
        </div>

        <div
          style={{
            background: "#f0fdf4",
            borderRadius: 10,
            padding: "12px 16px",
            marginBottom: 28,
            fontSize: 13,
            color: "#166534",
          }}
        >
          We will contact you to confirm within 30 minutes
        </div>

        <button
          onClick={() => onNavigate("home")}
          style={{
            width: "100%",
            padding: "13px 0",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}