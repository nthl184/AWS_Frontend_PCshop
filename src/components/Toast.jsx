export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        background: isError ? "#fef2f2" : "#f0fdf4",
        border: `1px solid ${isError ? "#fca5a5" : "#86efac"}`,
        color: isError ? "#b91c1c" : "#166534",
        padding: "12px 18px",
        borderRadius: 10,
        fontSize: 14,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        maxWidth: 320,
      }}
    >
      {toast.msg}
    </div>
  );
}