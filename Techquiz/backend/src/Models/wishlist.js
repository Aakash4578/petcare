var mongose = require("mongoose")

var wishlistSchema =  new mongose.Schema({
    name:String,
    image:String,
    user_id:String,
   

})
var wishlistModel= mongose.model("wishlist",wishlistSchema);

module.exports=wishlistModel;