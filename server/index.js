const { ApolloServer, gql } = require("apollo-server");

const typeDefs = require("./gqlfolder/typeDefs");
const resolvers = require("./gqlfolder/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
