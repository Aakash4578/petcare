var mongoes=require("mongoose")

var category_data= new mongoes.Schema({
    name:String,
    status:Number
})


var categoryModel=mongoes.model("categories",category_data);
module.exports=categoryModel;