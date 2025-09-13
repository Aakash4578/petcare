var mongoes = require("mongoose");

var data = new mongoes.Schema({
  Sheltername: String,
  contactpersonName:String,
  email: String,
  contactNumber: String,
  hash_password:String,
  profile_picture:String,
  address: { type: String, default: "" },
  status: { type: Number, default: 1 },
  verifyOpt: { type: String, default: "" },
  verifyOptExpireAt: { type: Number, default: 0 },
  isverify: { type: Boolean, default: false },
});
var shelter_data = mongoes.model("animalShelter", data);
module.exports = shelter_data;
