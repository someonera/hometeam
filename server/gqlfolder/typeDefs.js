const { gql } = require("apollo-server");

const typeDefs = gql`

type User {
  name: String
  tasks: [Task]
  numOfTasks: Int
  completedThisGame: Int
  completedEver: Int 
  id: ID
}

type Task {
  taskName: String
  taskWho: [User]
  taskDesc: String
  doDays: Int
  id: ID
}

type Game {
  currentScore: Int
  homeGoals: Int
  awayGoals: Int
  gameTasks: [Task]
  goalsBy: [User]
  players: [User]

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

  addUsersToTask(taskName: String!, name: String!):Task!

  }
`;
module.exports= typeDefs;