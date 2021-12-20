



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











































//----- Declaring counter variable to count total productTitle
// var totalProducts = 0;
// var query = Product.find();
// query.count(function(err, count) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Total Records Found: " + count);
//     totalProducts = count;
//   }
// });
















// app.route("/products")
//   .get((req, res) => {
//
//     // console.log(req.body)
//     Product.find((err, foundProducts) => {
//       if (!err) {
//         // console.log(req);
//         // res.send(foundProducts);
//         res.send({
//           data: foundProducts,
//           total: totalProducts
//         });
//       } else {
//         res.status(404).send('Not Found');
//         // res.send(err);
//       }
//     })
//
//   })
//
//
//
// app.route("/products/add-new-product")
//   .post(
//     counter,
//     (req, res) => {
//       //checking all fields are filled
//       if ((req.body.title == null || req.body.title.length <= 0) || (req.body.price == null || req.body.price.length <= 0) || (req.body.description == null || req.body.description.length <= 0)) {
//
//         return res.status(400).send({
//           Error: 400,
//           Message: "Bad Request",
//           Description: "Handling POST request at backend, so you can't miss any of the required field. Or the field cannot be empty."
//         })
//       }
//
//       const newProduct = new Product({
//         title: req.body.title,
//         price: req.body.price,
//         description: req.body.description
//       });
//
//       newProduct.save((err) => {
//         if (!err) {
//           console.log("New Record Added")
//           console.log(req.body);
//           res.send("Successfully added the new product");
//         } else {
//           return res.status(502).send({
//             Error: 502,
//             Message: "Bad Gateway",
//             Description: "Couldnot connect to database"
//           })
//           // res.send(err);
//         }
//       });
//     }
//   )
//
// app.route("/products/:productTitle")
//   .get(
//     (req, res) => {
//
//
//
//       //handling limit params
//       queryStr = req.params.productTitle;
//       // console.log(queryStr);
//       keyStr = queryStr.split("=")
//       // console.log(keyStr);
//       // console.log(Object.keys(obj)[0]);
//       if (keyStr[0] == "limit") {
//         Product.find((err, foundProducts) => {
//             if (!err) {
//               // console.log(req);
//               // res.send(foundProducts);
//               res.send({
//                 data: foundProducts,
//                 total: totalProducts
//               });
//             } else {
//               res.status(502).send({
//                 Error: 502,
//                 Message: "Bad Gateway",
//                 Description: "Couldnot connect to database"
//               })
//               // res.send(err);
//             }
//           })
//           .limit(Number(keyStr[1]))
//         return;
//         // console.log();
//       }
//       Product.findOne({
//         title: req.params.productTitle
//       }, (err, foundProduct) => {
//         if (foundProduct) {
//           // console.log(foundProduct);
//           res.send(foundProduct);
//         } else {
//           res.send("No such product fonund: " + req.params.productTitle);
//         }
//       });
//     }
//   )
//
//   .put(
//     (req, res) => {
//       const query = {
//         title: req.params.productTitle
//       }; //your query here
//
//       if (req.body.title == null || req.body.price == null || req.body.description == null) {
//         // console.log(req.body.description)
//         return res.status(400).send({
//           Error: 400,
//           Message: "Bad Request",
//           Description: "Handling PUT request at backend, so you can't miss any of the required field."
//         })
//         // return res.send(400, {
//         //   Error: 400,
//         //   Message: "Bad Request",
//         //   Description: "Handling PUT request at backend, so you can't miss any of the required field."
//         // })
//       }
//       const update = {
//         title: req.body.title,
//         price: req.body.price,
//         description: req.body.description
//       }; //your update in json here
//
//       Product.findOneAndUpdate(query, update, {
//         new: true
//       }, function(err, doc) {
//         if (err) {
//           res.send(500, {
//             error: err
//           });
//         } else {
//           res.send('Succesfully Updated.');
//           console.log(req.body);
//         }
//       })
//     })
//
//   .delete(
//     (req, res) => {
//       console.log("Deleting...");
//       console.log(req.body);
//       Product.deleteOne({
//           title: req.params.productTitle
//         },
//         function(err) {
//           if (!err) {
//             totalProducts--
//             res.send("Deleted successfully");
//             // console.log(err);
//           } else {
//             res.status(502).send({
//               Error: 502,
//               Message: "Bad Gateway",
//               Description: "Couldnot connect to database"
//             })
//             // res.send("Couldnt delete" + err);
//           }
//         });
//     }
//   )


//-----Middleware to check on total productsSchema
// function counter(req, res, next) {
//   totalProducts++;
//   console.log(totalProducts);
//   if (totalProducts < 6) {
//     console.log(req.body);
//     next();
//   } else {
//     console.log("Total products reached 5, cant add anymore: \n" + req.body);
//     res.status(429).send({
//       Error: 429,
//       Message: "Too Many Requests"
//     })
//   }
// }
