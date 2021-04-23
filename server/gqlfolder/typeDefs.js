const { gql } = require('apollo-server')

const typeDefs = gql`

type User {
  name: String
  tasks: [Task!]
  id: ID
}

type Task {
  taskName: String
  taskWho: User
  id: ID
}

type Query {
  getUser(name:String!): [User!]
  getAllUsers: [User!]
  getTask(taskName:String!):[Task!]
  getAllTasks: [Task!]
}

type Mutation {
  addUser(name:String!):User!
  #delete user

  addTask(taskName: String!):Task!
  #delete task
}

`
module.exports = typeDefs