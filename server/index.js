import { ApolloServer } from "apollo-server";

import { schema } from "./gqlfolder/Schema/index.js";

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
