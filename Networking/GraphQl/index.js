import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

// When you open the graphql playground client in the browser and hit the request you can see an api call inside the network tab. Right click on the request and copy as fetch.

// You will see that the data that you are sending in the payload is the query which is in the form of stringified data that you send over the network.

// You try to make this request using fetch and you will get the response.
