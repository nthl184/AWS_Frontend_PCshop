import { useEffect, useState } from "react";
import { CATEGORIES } from "../db";
import { getProducts } from "../api/productAPI";
import { useCart } from "../store/CartStore";
import ProductCard from "../components/ProductCard";

export default function HomePage({ search, onShowToast }) {
  const [cat, setCat] = useState("All");
  const { dispatch } = useCart();


const [products, setProducts] = useState([]);
const [loading, setLoading]   = useState(true);

useEffect(() => {
  getProducts()
    .then(res => setProducts(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);

if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  // --------------------------------------

  const filtered = products.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch({ type: "ADD", item: product });
    onShowToast(`Added ${product.name} to cart`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
          borderRadius: 16,
          padding: "36px 40px",
          marginBottom: 32,
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
              PC Shop
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 16 }}>
          GPU · CPU · RAM · SSD · Mainboard · PSU — Gruantee in 36 months!
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              border: "1.5px solid",
              borderColor: cat === c ? "#2563eb" : "#e2e8f0",
              background: cat === c ? "#2563eb" : "#fff",
              color: cat === c ? "#fff" : "#475569",
              fontWeight: cat === c ? 600 : 400,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
        ))}

        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: 60,
              color: "#94a3b8",
            }}
          >
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}