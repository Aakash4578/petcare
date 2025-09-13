var mongoes = require("mongoose");


const data = new mongoes.Schema({
  pet_id: {
    type: String,
   
  },
    pet_name: {
    type: String,
   
  },
  owner_id: {
    type: String,
  
  
  },
    name: {
    type: String,
 
  },
    reason: {
    type: String,
 
  },
      email: {
    type: String,
 
  },
  vet_id: {
   type: String,
  },
vet_name: {
   type: String,
  },
  appointment_time: {
    type: String,
    
  },
  status: {
    type: String,
 
  },
},);
var appointment_data = mongoes.model("appointments", data);
module.exports = appointment_data;