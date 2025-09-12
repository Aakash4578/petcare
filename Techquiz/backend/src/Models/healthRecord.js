const mongoose = require("mongoose");
const appointment_data = require("./Appointment");
const HealthRecordSchema = new mongoose.Schema({
    appointment_id: {
    type: String,
   
  },
  pet_id: {
    type: String,
   
  },
   user_id: {
    type: String,
   
  },
pet_name: {
    type: String,
   
  },
  vet_id: {
    type:String,
   
  },
  vet_name: {
    type:String,
   
  },
  
  visit_date: {
    type: String,

default: Date.now, 
    // defaults to current date if not provided
  },
  diagnosis: {
    type: String,

  },
  treatment: {
    type: String,
   
  },
},);
module.exports = mongoose.model("HealthRecord", HealthRecordSchema);