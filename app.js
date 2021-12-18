const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const {
  body,
  validationResult
} = require('express-validator');

// const Validator = require("fastest-validator")

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/productsdb", {
  useNewUrlParser: true
});

const productsSchema = {
  title: String,
  price: Number,
  description: String
};

const Product = mongoose.model("Product", productsSchema);

// const product = new Product({
//   title: "Green Tea",
//   price: 150,
//   description: "1 green tea tepal lemon grass"
// });


//----- Declaring counter variable to count total productTitle
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
  .post(
    counter,
    // body("title").isLength({
    //   min: 2
    // }), body("price").isLength({
    //   min: 1
    // }), body("description").isLength({
    //   min: 1
    // }),
    (req, res) => {
      //checking all fields are filled
      if ((req.body.title == null || req.body.title.length <= 0) || (req.body.price == null || req.body.price.length <= 0) || (req.body.description == null || req.body.description.length <= 0)) {
        // console.log(req.body.description)
        // return res.send(400, {
        //   Error: 400,
        //   Message: "Bad Request",
        //   Description: "Handling POST request at backend, so you can't miss any of the required field. Or the field cannot be empty."
        // })

        return res.status(400).send({
          Error: 400,
          Message: "Bad Request",
          Description: "Handling POST request at backend, so you can't miss any of the required field. Or the field cannot be empty."
        })
      }

      const newProduct = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
      });

      newProduct.save((err) => {
        if (!err) {
          console.log("New Record Added")
          console.log(req.body);
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



      //handling limit params
      queryStr = req.params.productTitle;
      // console.log(queryStr);
      keyStr = queryStr.split("=")
      // console.log(keyStr);
      // console.log(Object.keys(obj)[0]);
      if (keyStr[0] == "limit") {
        Product.find((err, foundProducts) => {
            if (!err) {
              // console.log(req);
              // res.send(foundProducts);
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
          // console.log(foundProduct);
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
        // return res.send(400, {
        //   Error: 400,
        //   Message: "Bad Request",
        //   Description: "Handling PUT request at backend, so you can't miss any of the required field."
        // })
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


//-----Middleware to check on total productsSchema
function counter(req, res, next) {
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
      // Description: "Couldnot connect to database"
    })
    // res.send(429, {
    //   error: "Too Many Requests"
    // });
    // res.send("Error 429")
  }
}



app.listen(3000, function() {
  console.log("Server Started on Port 3000")
});
