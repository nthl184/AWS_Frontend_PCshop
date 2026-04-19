import { fmt, BADGE_COLORS } from "../db";

export default function ProductCard({ product, onAddToCart }) {
  const { name, category, price, stock, image, desc } = product;
  const inStock = stock > 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      <img src={image} alt={name} style={{ width: "100%", display: "block" }} />

      <div style={{ padding: "16px 18px" }}>
        {/* Category badge */}
        <span
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 9px",
            borderRadius: 20,
            background: (BADGE_COLORS[category] || "#888") + "22",
            color: BADGE_COLORS[category] || "#888",
            marginBottom: 8,
          }}
        >
          {category}
        </span>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#0f172a" }}>
          {name}
        </h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 10 }}>{desc}</p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800, color: "#1d4ed8" }}>
            {fmt(price)}
          </span>
          <span
            style={{
              fontSize: 12,
              color: inStock ? "#16a34a" : "#dc2626",
              fontWeight: 600,
            }}
          >
            {inStock ? `In Stock: ${stock}` : "Out of Stock"}
          </span>
        </div>

        <button
          onClick={() => inStock && onAddToCart(product)}
          disabled={!inStock}
          style={{
            width: "100%",
            padding: "10px 0",
            borderRadius: 8,
            border: "none",
            background: inStock ? "#2563eb" : "#e2e8f0",
            color: inStock ? "#fff" : "#94a3b8",
            fontWeight: 600,
            fontSize: 14,
            cursor: inStock ? "pointer" : "not-allowed",
          }}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}