var mongoose = require("mongoose");
require("dotenv").config(); // 👈 ye sabse top par hona chahiye

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Database Connected");
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
  });

