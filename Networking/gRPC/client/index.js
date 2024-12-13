const express = require("express");
const body_parser = require("body-parser");
const client = require("./client");

const app = express();

app.use(body_parser.json());

const PORT = 8000;

app.get("/", (req, res) => {
  client.getAll(null, (err, data) => {
    if (!err) {
      res.send({
        data: data.customers,
      });
    }
  });
});

app.post("/create", (req, res) => {
  let new_customer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  client.insert(new_customer, (err, data) => {
    if (err) throw err;
    res.send({
      message: "Customer successfully created!",
      data,
    });
  });
});

app.post("/update", (req, res) => {
  let updated_customer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  client.update(updated_customer, (err, data) => {
    if (err) throw err;
    res.send({
      message: "Customer successfully updated!",
      data,
    });
  });
});

app.post("/remove", (req, res) => {
  client.remove({ id: req.body.customer_id }, (err, data) => {
    if (err) throw err;
    res.send({
      message: "Customer successfully removed!",
      data,
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
