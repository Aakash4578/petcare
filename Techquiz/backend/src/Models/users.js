const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  hash_password: String,
  first_name: String,
  last_name: String,
  phone: String,
  address:String,
  profile_picture: String,
  status: {type:Number, default:1},
  role: {type:Number, default:0},
  verifyOpt:{type:String, default:''},
  verifyOptExpireAt:{type:Number, default:0},
  isverify:{type:Boolean ,default:false},



});

module.exports = mongoose.model("Users", userSchema);
