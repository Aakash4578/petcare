var mongoes=require("mongoose")

var data= new  mongoes.Schema({
name:String,
des:String,
Image:String,
quantity:Number,
Price:Number,
Status:Number,
category:String
})
var product_data=mongoes.model("products",data);
module.exports=product_data;