



// app.post("/products", counter, (req, res) => {
//   // console.log(req.body);
//   console.log("New Record Added")
//   console.log(req.body);
//   const newProduct = new Product({
//     title: req.body.title,
//     price: req.body.price,
//     description: req.body.description
//   });
//
//   newProduct.save((err) => {
//     if (!err) {
//       res.send("Successfully added the new product");
//     } else {
//       res.send(err);
//     }
//   });
// });

//-----read all product (the collections resource)

// app.get("/products", (req, res) => {
//   console.log(req.body);
//   Product.find((err, foundProducts) => {
//     if (!err) {
//       // console.log(req);
//       res.send(foundProducts);
//     } else {
//       res.send(err);
//     }
//   })
// });

//-----read a single product resource

// app.get("/products/:productTitle", (req, res) => {
//   // console.log(req.body);
//   Product.findOne({
//     title: req.params.productTitle
//   }, (err, foundProduct) => {
//     if (foundProduct) {
//       console.log(foundProduct);
//       res.send(foundProduct);
//     } else {
//       res.send("No such product fonund");
//     }
//   });
// });

//-----update a single product resource

// app.put("/products/:productTitle", (req, res) => {
//   const query = {
//     title: req.params.productTitle
//   }; //your query here
//   const update = {
//     title: req.body.title,
//     price: req.body.price,
//     description: req.body.description
//   }; //your update in json here
//
//   Product.findOneAndUpdate(query, update, {
//     new: true
//   }, function(err, doc) {
//     if (err) {
//       res.send(500, {
//         error: err
//       });
//     } else {
//       res.send('Succesfully saved.');
//     }
//   });


// console.log(req.params.productTitle);
// //below is depricated i will implement findoneanduupdate
// Product.update({title: req.params.productTitle},
//   {$set: {title: req.body.title, price: req.body.price, description: req.body.description}},
//   {overwrite: true},
//   (err)=>{
//     if(!err){
//       res.send("Sucess at updating");
//     }else{
//       res.send("Failed to update: "+err);
//     }
//   });


//-----delete a single product resource

// app.delete("/products/:productTitle", (req, res) => {
//   console.log("Deleting");
//   console.log(req.params.productTitle);
//   Product.deleteOne({
//       title: "vall"
//     },
//     function(err) {
//
//       if (!err) {
//         res.send("Deleted successfully");
//         console.log(err);
//       } else {
//         res.send("Couldnt delete" + err);
//       }
//     });
// });














//calculating length
// Object.keys(update).length

//testing validation
// const validationSchema = {
//   title: {
//     type: "string",
//     optional: true,
//     max: "100"
//   },
//   price: {
//     type: "string",
//     optional: true, //means not forcing type
//     max: "10"
//   },
//   description: {
//     type: "string",
//     optional: true,
//     max: "1000"
//   }
// }
// const val = new Validator();
// const response = val.validate(update, validationSchema)
//
// if (response !== true) {
//   return res.send(400, {
//     Error: response
//   })
// }
