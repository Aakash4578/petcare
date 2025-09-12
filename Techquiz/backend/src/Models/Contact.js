const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactUsSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  message: {
    type: String,
  },
  submitted_at: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
