import { useCart } from "../store/CartStore";

export default function Navbar({ page, onNavigate, search, onSearch }) {
  const { totalItems } = useCart();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: 58,
        background: "#0f172a",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => onNavigate("home")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 800,
          fontSize: 19,
          letterSpacing: -0.5,
        }}
      >
        ⚡ PC Shop
      </button>

      {/* Search */}
      {page === "home" && (
        <input
          placeholder="Find products..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            padding: "7px 16px",
            borderRadius: 8,
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#e2e8f0",
            fontSize: 14,
            width: 240,
            outline: "none",
          }}
        />
      )}

      {/* Cart icon + badge */}
      <button
        onClick={() => onNavigate("cart")}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#e2e8f0",
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 22 }}>🛒</span>
        <span>Cart</span>
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              background: "#2563eb",
              color: "#fff",
              borderRadius: "50%",
              width: 20,
              height: 20,
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  );
}