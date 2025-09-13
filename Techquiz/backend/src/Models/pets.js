var mongoose = require("mongoose");
const PetSchema = new mongoose.Schema({
  owner_id: {
    type:String,
   
  },
  name: {
    type: String,
  
  },
     pet_img: {
    type: String,
  },
  species: {
    type: String,

  },
  breed: {
    type: String,
  },
  age: {
    type: Number,
    min: 1,
  },
  gender: {
    type: String,

  },
});

const Pet = mongoose.model("Pets", PetSchema);
module.exports = Pet;
