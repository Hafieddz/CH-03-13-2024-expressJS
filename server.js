require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(`Database Connected!`);
  });

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia",
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const customerTest = new Customer({
  name: "Hafied2z",
  email: "testing112@gmail.com",
  phoneNumber: 12223344,
});

customerTest
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(`Data Gagal Disimpan`);
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
