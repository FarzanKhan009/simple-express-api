const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/productsdb", {
  useNewUrlParser: true
});

const productsSchema = {
  title: String,
  price: Number,
  description: String
};




module.exports = mongoose.model("Product", productsSchema);
