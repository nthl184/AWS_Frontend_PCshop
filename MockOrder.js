import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCT_SERVICE = "http://localhost:3001";

app.post("/api/orders", async (req, res) => {
  const { customer, items, total } = req.body;

  try {
    // Check stock từng sản phẩm — gọi Product Service
    for (const item of items) {
      const { data: product } = await axios.get(
        `${PRODUCT_SERVICE}/products/${item.productId}`
      );
      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `"${product.name}" In stock ${product.stock} items, not enough ${item.qty}`,
        });
      }
    }

    // Trừ stock
    for (const item of items) {
      const { data: product } = await axios.get(
        `${PRODUCT_SERVICE}/products/${item.productId}`
      );
      await axios.patch(`${PRODUCT_SERVICE}/products/${item.productId}`, {
        stock: product.stock - item.qty,
      });
    }

    // Lưu order vào db.json
    const orderId =
      "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    await axios.post(`${PRODUCT_SERVICE}/orders`, {
      id: orderId,
      customer,
      items,
      total,
      status: "created",
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ orderId, status: "created" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
});

app.get("/api/orders/:id", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${PRODUCT_SERVICE}/orders/${req.params.id}`
    );
    res.json(data);
  } catch {
    res.status(404).json({ message: "Order not found" });
  }
});

app.listen(3002, () =>
  console.log("✅ Order Service mock at http://localhost:3002")
);