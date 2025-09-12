var mongoes = require("mongoose");

var data = new mongoes.Schema({
  name: String,
  email: String,
  contactNumber: String,
  hash_password:String,
 
  address: { type: String, default: "" },
  specialization:{ type: String, default: "" },
  experience:{ type: String, default: "" },
   time_slots:{ type: String, default: "" },
  status: { type: Number, default: 1 },
  verifyOpt: { type: String, default: "" },
  verifyOptExpireAt: { type: Number, default: 0 },
  isverify: { type: Boolean, default: false },
});
var vet_data = mongoes.model("Veterinarians", data);
module.exports = vet_data;
