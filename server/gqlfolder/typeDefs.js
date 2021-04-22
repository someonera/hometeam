const { gql } = require('apollo-server')

const typeDefs = gql`

type User {
  name: String
  # is captain? boolean
  #tasks : array of tasks 
}

type Query {
  getUser(name:String!): [User!]
  getAllUsers: [User!]
}

type Mutation {
  addUser(name:String!):User!
}

`
module.exports = typeDefs