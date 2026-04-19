import { useState } from "react";
import { CartProvider } from "./store/CartStore";
import Navbar           from "./components/Navbar";
import Toast            from "./components/Toast";
import HomePage         from "./pages/HomePage";
import CartPage         from "./pages/CartPage";
import CheckoutPage     from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

export default function App() {
  const [page, setPage]           = useState("home");
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState(null);
  const [orderState, setOrderState] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const navigate = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  return (
    <CartProvider>
      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>

        <Toast toast={toast} />

        <Navbar
          page={page}
          onNavigate={navigate}
          search={search}
          onSearch={setSearch}
        />

        {page === "home" && (
          <HomePage search={search} onShowToast={showToast} />
        )}

        {page === "cart" && (
          <CartPage onNavigate={navigate} />
        )}

        {page === "checkout" && (
          <CheckoutPage
            onNavigate={navigate}
            onOrderSuccess={setOrderState}
            onShowToast={showToast}
          />
        )}

        {page === "success" && (
          <OrderSuccessPage
            orderState={orderState}
            onNavigate={(target) => {
              setOrderState(null);
              navigate(target);
            }}
          />
        )}

      </div>
    </CartProvider>
  );
}