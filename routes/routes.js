module.exports = (app) => {
  const { body, validationResult } = require('express-validator');

  const Product = require('../models/product-model.js');
  const {
    postLimit,
    totalProducts
  } = require('../middlewares/middleware.js');

  app.route("/products")
    .get((req, res) => {

      // console.log(req.body)
      Product.find((err, foundProducts) => {
        if (!err) {
          // console.log(req);
          // res.send(foundProducts);
          res.send({
            data: foundProducts,
            total: totalProducts
          });
        } else {
          res.status(404).send('Not Found');
          // res.send(err);
        }
      })

    })

  app.route("/products/add-new-product")
    .post(
      postLimit,

      body('title').exists({
        checkFalsy: true
      }),
      // password must be at least 5 chars long
      body('price').exists({
        checkFalsy: true
      }),

      (req, res) => {
        //checking all fields are filled
        // if ((req.body.title == null || req.body.title.length <= 0) || (req.body.price == null || req.body.price.length <= 0) || (req.body.description == null || req.body.description.length <= 0)) {
        //
        //   return res.status(400).send({
        //     Error: 400,
        //     Message: "Bad Request",
        //     Description: "Handling POST request at backend, so you can't miss any of the required field. Or the field cannot be empty."
        //   })
        // }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const newProduct = new Product({
          title: req.body.title,
          price: req.body.price,
          description: req.body.description
        });

        newProduct.save((err) => {
          if (!err) {
            console.log("New Record Added")
            // console.log(req.body);
            res.send("Successfully added the new product");
          } else {
            return res.status(502).send({
              Error: 502,
              Message: "Bad Gateway",
              Description: "Couldnot connect to database"
            })
            // res.send(err);
          }
        });
      }
    )

  app.route("/products/:productTitle")
    .get(
      (req, res) => {
        queryStr = req.params.productTitle;
        keyStr = queryStr.split("=")
        if (keyStr[0] == "limit") {
          Product.find((err, foundProducts) => {
              if (!err) {
                res.send({
                  data: foundProducts,
                  total: totalProducts
                });
              } else {
                res.status(502).send({
                  Error: 502,
                  Message: "Bad Gateway",
                  Description: "Couldnot connect to database"
                })
                // res.send(err);
              }
            })
            .limit(Number(keyStr[1]))
          return;
          // console.log();
        }
        Product.findOne({
          title: req.params.productTitle
        }, (err, foundProduct) => {
          if (foundProduct) {
            res.send(foundProduct);
          } else {
            res.send("No such product fonund: " + req.params.productTitle);
          }
        });
      }
    )

    .put(
      (req, res) => {
        const query = {
          title: req.params.productTitle
        }; //your query here

        if (req.body.title == null || req.body.price == null || req.body.description == null) {
          // console.log(req.body.description)
          return res.status(400).send({
            Error: 400,
            Message: "Bad Request",
            Description: "Handling PUT request at backend, so you can't miss any of the required field."
          })
        }
        const update = {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description
        }; //your update in json here

        Product.findOneAndUpdate(query, update, {
          new: true
        }, function(err, doc) {
          if (err) {
            res.send(500, {
              error: err
            });
          } else {
            res.send('Succesfully Updated.');
            console.log(req.body);
          }
        })
      })

    .delete(
      (req, res) => {
        console.log("Deleting...");
        console.log(req.body);
        Product.deleteOne({
            title: req.params.productTitle
          },
          function(err) {
            if (!err) {
              totalProducts--
              res.send("Deleted successfully");
              // console.log(err);
            } else {
              res.status(502).send({
                Error: 502,
                Message: "Bad Gateway",
                Description: "Couldnot connect to database"
              })
              // res.send("Couldnt delete" + err);
            }
          });
      }
    )
}
