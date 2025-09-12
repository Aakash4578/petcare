var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  user_id: String,
name: String,
email: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      total: Number,
    },
  ],
  totalAmount: Number,
  address: {
    state: String,
    street: String,
    town: String,
    postcode: String,
    phone: String,
  },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

var orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
