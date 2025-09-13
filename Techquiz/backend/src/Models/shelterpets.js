var mongoose = require("mongoose");
const PetSchema = new mongoose.Schema({
  shelter_id: {
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
  status: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,

  },
});

const Pet = mongoose.model("shelterPets", PetSchema);
module.exports = Pet;
