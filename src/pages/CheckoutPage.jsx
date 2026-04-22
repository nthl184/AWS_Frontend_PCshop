import { useState } from "react";
import { fmt } from "../constants";
import { useCart } from "../store/CartStore";
import { createOrder } from "../api/orderAPI";

const FIELDS = [
  { key: "name",    label: "Full Name",        placeholder: "John Doe" },
  { key: "phone",   label: "Phone Number",     placeholder: "0912 345 678" },
  { key: "address", label: "Delivery Address", placeholder: "123 ABC Street, District 1, HCM City" },
];

export default function CheckoutPage({ onNavigate, onOrderSuccess, onShowToast }) {
  const { cart, totalItems, totalPrice, dispatch } = useCart();
  const [form, setForm]             = useState({ name: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      onShowToast("Please fill in all information", "error");
      return;
    }

    setSubmitting(true);

    try {
      
      const payload = {
        user_id:     1,           
        total_price: totalPrice,  
        customer:    form,        
        items: cart.map(i => ({
          productId: i.id,        
          product_id: i.id,       
          quantity:  i.qty,       
          price:     i.price,     
        })),
      };

      const { data } = await createOrder(payload);

      dispatch({ type: "CLEAR" });
      onOrderSuccess({
        orderId:  data.orderId,
        customer: { ...form },
        items:    [...cart],
        total:    totalPrice,
      });
      onNavigate("success");

    } catch (err) {
      // Order Service trả lỗi khi hết hàng
      const msg = err?.response?.data?.message || "Failed to place order, please try again";
      onShowToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: 900, margin: "0 auto", padding: "32px 24px",
      display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start",
    }}>
      {/* Left: Form */}
      <div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "#0f172a" }}>
          Order Information
        </h2>

        <div style={{
          background: "#fff", borderRadius: 14,
          border: "1px solid #e2e8f0", padding: "24px 28px", marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: "#374151" }}>
            Information for delivery
          </h3>
          {FIELDS.map(f => (
            <div key={f.key} style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                {f.label}
              </label>
              <input
                value={form[f.key]}
                placeholder={f.placeholder}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: "1.5px solid #e2e8f0", fontSize: 14,
                  color: "#0f172a", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          ))}
        </div>

        <div style={{
          background: "#f0fdf4", borderRadius: 12, border: "1px solid #bbf7d0",
          padding: "14px 18px", fontSize: 13, color: "#166534",
        }}>
          ✅ Payment upon delivery (COD) — Check the product before payment
        </div>
      </div>

    
      <div style={{ position: "sticky", top: 74 }}>
        <div style={{
          background: "#fff", borderRadius: 14,
          border: "1px solid #e2e8f0", padding: "20px 22px",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#0f172a" }}>
            Order Summary ({totalItems} products)
          </h3>

          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
              <img
                src={item.product_image || item.image}
                style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 6 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 12, color: "#94a3b8" }}>x{item.qty}</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8", whiteSpace: "nowrap" }}>
                {fmt(item.price * item.qty)}
              </span>
            </div>
          ))}

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14, marginTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
              <span>Tổng cộng</span>
              <span style={{ color: "#1d4ed8" }}>{fmt(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit} disabled={submitting}
            style={{
              marginTop: 16, width: "100%", padding: "13px 0",
              background: submitting ? "#93c5fd" : "#2563eb",
              color: "#fff", border: "none", borderRadius: 10,
              fontWeight: 700, fontSize: 15,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? "Processing..." : "Submit Order"}
          </button>

          <button
            onClick={() => onNavigate("cart")}
            style={{
              marginTop: 8, width: "100%", padding: "9px 0",
              background: "none", color: "#64748b",
              border: "1px solid #e2e8f0", borderRadius: 10,
              fontSize: 13, cursor: "pointer",
            }}
          >
            ← Return to cart
          </button>
        </div>
      </div>
    </div>
  );
}