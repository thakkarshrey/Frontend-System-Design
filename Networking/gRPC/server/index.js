const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./customers.proto";
const proto_loader = require("@grpc/proto-loader");

const package_definition = proto_loader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});

console.log(package_definition, "package_definition");

const customersProto = grpc.loadPackageDefinition(package_definition);

console.log(customersProto, "customersProto");

const grpc_server = new grpc.Server();

// This data will come from database
const customers = [
  {
    id: "random12",
    name: "Shrey Thakkar",
    age: 25,
    address: "Bhayli",
  },
  {
    id: "random13",
    name: "Neha Arya",
    age: 25,
    address: "Bhayli",
  },
];

grpc_server.addService(customersProto.CustomerService.service, {
  getAll: (call, callback) => {
    callback(null, { customers });
  },
  get: (call, callback) => {
    const customer = customers.find(
      (element) => element.id === call.request.id
    );

    if (!customer) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found!",
      });
    } else {
      callback(null, { customer });
    }
  },
  insert: (call, callback) => {
    let customer = call.request;
    customer.id = `${Math.random()}`;
    customers.push(customer);
    callback(null, { customer });
  },
  update: (call, callback) => {
    let existing_customer = customers.find(
      (element) => element.id === call.request.id
    );
    if (existing_customer) {
      existing_customer.name = call.request.name;
      existing_customer.age = call.request.age;
      existing_customer.address = call.request.address;
      existing_customer.id = call.request.id;

      callback(null, { customer: existing_customer });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found!",
      });
    }
  },
  remove: (call, callback) => {
    let customer_index = customers.findIndex(
      (element) => element.id === call.request.id
    );

    if (customer_index !== -1) {
      customers.splice(customer_index, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found!",
      });
    }
  },
});

grpc_server.bindAsync(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.log(`Error starting grpc server : ${err}`);
    } else {
      grpc_server.start();
      console.log(`grpc server successfully running on port ${port}`);
    }
  }
);
