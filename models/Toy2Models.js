var mongoose = require('mongoose')
var Toy2Schema = mongoose.Schema(
   {
      name: String,
      brand: String,
      detail: String,
      quantity: Number, 
      image: String,
      video: String,
      price: Number,
      date: String
   }
)
var Toy2Models = mongoose.model("Toy2", Toy2Schema, "toys2");
module.exports = Toy2Models;