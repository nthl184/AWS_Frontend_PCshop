// file test mock db
import express from "express";
import axios from "axios";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCT_SERVICE = "http://localhost:3001";

// POST /api/orders
app.post("/api/orders", async (req, res) => {
  const { user_id = 1, items, total_price } = req.body;

  try {
    // Check stock — gọi Product Service
    for (const item of items) {
      const { data: product } = await axios.get(
        `${PRODUCT_SERVICE}/products/${item.productId}`
      );
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `"${product.name}" In stock ${product.stock} items, not enough ${item.quantity}`,
        });
      }
    }

    // Trừ stock
    for (const item of items) {
      const { data: product } = await axios.get(
        `${PRODUCT_SERVICE}/products/${item.productId}`
      );
      await axios.patch(`${PRODUCT_SERVICE}/products/${item.productId}`, {
        stock: product.stock - item.quantity,
      });
    }

    // Tạo order
     const orderId = uuidv4();
    await axios.post(`${PRODUCT_SERVICE}/orders`, {
      id: orderId,
      user_id,
      total_price,
      status: "pending",
      created_at: new Date().toISOString(),
    });
    // Tạo order_items 
    for (const item of items) {
      await axios.post(`${PRODUCT_SERVICE}/order_items`, {
        order_id:   orderId,
        product_id: item.productId,   
        quantity:   item.quantity,
        price:      item.price,       
      });
    }

    res.status(201).json({ orderId, status: "pending" });
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
});
// GET /api/orders/:id 
app.get("/api/orders/:id", async (req, res) => {
  try {
    const { data: order } = await axios.get(
      `${PRODUCT_SERVICE}/orders/${req.params.id}`
    );
    // Lấy thêm order_items
    const { data: allItems } = await axios.get(`${PRODUCT_SERVICE}/order_items`);
    const items = allItems.filter(i => i.order_id === req.params.id);
    res.json({ ...order, items });
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});
// PUT /api/orders/:id/process 
app.put("/api/orders/:id/process", async (req, res) => {
  try {
    await axios.patch(`${PRODUCT_SERVICE}/orders/${req.params.id}`, {
      status: "completed",
    });
    res.json({ message: "Completed" });
  } catch {
    res.status(404).json({ message: "Not found" });
  }
});

app.listen(3002, () =>
  console.log("✅ Order Service mock run at http://localhost:3002")
);
