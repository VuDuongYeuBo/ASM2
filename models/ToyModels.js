var mongoose = require('mongoose')
var ToySchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      detail: String,
      quantity: Number, 
      image: String,
      video: String,
      price: Number
   }
)
var ToyModels = mongoose.model("Toy", ToySchema, "toys");
module.exports = ToyModels;