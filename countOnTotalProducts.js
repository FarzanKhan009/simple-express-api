var totalProducts = 0;
var query = Product.find();
query.count(function(err, count) {
  if (err) {
    console.log(err)
  } else {
    console.log("Total Records Found: " + count);
    totalProducts = count;
  }
});

module.export = totalProducts;
