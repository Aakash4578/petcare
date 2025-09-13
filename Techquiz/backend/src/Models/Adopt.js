const mongoose = require("mongoose");

const AdoptionRequestSchema = new mongoose.Schema({
  pet_id: { type:String },
pet_name: { type: String},
  // No linked owner – just store info from random user
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },

  message: { type: String },

  status: {
    type: String,
    
    default: "pending"
  },

  request_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AdoptionRequest", AdoptionRequestSchema);
