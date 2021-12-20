
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');





const Product = require('../models/product-model.js');

var totalProducts = 0;
var query = Product.find();
query.count(function(err, count) {
  if (err) {
    console.log(err)
  } else {
    // console.log("Total Records Found: " + count);
    totalProducts = count;
  }
});


function postLimit(req, res, next) {
  totalProducts++;
  console.log(totalProducts);
  if (totalProducts < 6) {
    console.log(req.body);
    next();
  } else {
    console.log("Total products reached 5, cant add anymore: \n" + req.body);
    res.status(429).send({
      Error: 429,
      Message: "Too Many Requests"
    })
  }
}


// function validator(req,res, next){
//   // must include title
//   body('title').exists({checkFalsy: true}),
//   // password must be at least 5 chars long
//   body('price').exists({checkFalsy: true }),
//   (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }}



module.exports.postLimit = postLimit;
module.exports.totalProducts = totalProducts;
