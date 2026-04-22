import { useState, useEffect } from "react";
import { useCart } from "../store/CartStore";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productAPI";

const CATEGORY_MAP = {
  1: "CPU",
  2: "VGA",
  3: "RAM",
  4: "Monitor",
  5: "Keyboard",
  6: "Mouse",
  7: "Headset",
};
 
const CATEGORIES = ["All", "CPU", "VGA", "RAM", "Monitor", "Keyboard", "Mouse", "Headset"];

export default function HomePage({ search, onShowToast }) {
  const [cat, setCat]         = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const { dispatch } = useCart();

  // Gọi Product Service 
  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(() => onShowToast("Don't load products", "error"))
      .finally(() => setLoading(false));
  }, []);

  // Map category_id 
  const filtered = products.filter(p => {
    const catName = CATEGORY_MAP[p.category_id] || "";
    return (
      (cat === "All" || catName === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD", item: product });
    onShowToast(`Added ${product.name} to cart`);
  };

  if (loading) return (
    <p style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
      Loading products...
    </p>
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
        borderRadius: 16, padding: "36px 40px", marginBottom: 32, color: "#fff",
      }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          PC Components Store
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 16 }}>
          CPU · VGA · RAM · Monitor · Keyboard · Mouse · Headset — 36-months warranty
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "7px 18px", borderRadius: 20, border: "1.5px solid",
            borderColor: cat === c ? "#2563eb" : "#e2e8f0",
            background: cat === c ? "#2563eb" : "#fff",
            color: cat === c ? "#fff" : "#475569",
            fontWeight: cat === c ? 600 : 400, fontSize: 14, cursor: "pointer",
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20,
      }}>
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={{
              ...p,
              image:    p.product_image, 
              category: CATEGORY_MAP[p.category_id] || "Other",
            }}
            onAddToCart={handleAddToCart}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 60, color: "#94a3b8" }}>
            No products found
          </div>
        )}
      </div>
    </div>
  );
}