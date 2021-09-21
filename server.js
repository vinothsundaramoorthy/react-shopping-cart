const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost/react-shipping-cart-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// const URI = process.env.MONGODB_URL;
// mongoose.connect(URI, { useUnifiedTopology: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully");
// } )

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteProduct);
});

const Order = mongoose.model(
  "order",
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Data is Requires" });
  }
  const order = await Order(req.body).save();
  res.send(order);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Serve at http://localhost:5000"));
