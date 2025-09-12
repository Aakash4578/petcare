var mongose = require("mongoose")

var cartSchema =  new mongose.Schema({
    name:String,
    image:String,
    productId:String,
    user_id:String,
    price:Number,
    quantity:Number,
    total:String,
   

})
var cartModel= mongose.model("cart",cartSchema );

module.exports = cartModel;