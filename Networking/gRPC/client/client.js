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

const CustomerService =
  grpc.loadPackageDefinition(package_definition).CustomerService;

const client = new CustomerService(
  "127.0.0.1:30043",
  grpc.ServerCredentials.createInsecure()
);

module.exports = client;
