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
  taskWho: String
  taskDesc: String
  interval: Int
  id: ID
  startDate: String
}

type Game {
  startDate: String
  endDate: String
  score: Int
  gameTasks:[Task]
  players:[User]
  doneTasks:[Task]
  notDoneTasks:[Task]
  id: ID
}

type Query {
  getUser(name:String!): [User!]
  getAllUsers: [User!]
  getTask(taskName:String!):[Task!]
  getAllTasks: [Task!]
  getGame(endDate: String!): Game
}

type Mutation {

  addUser(name:String!):User!
  #delete user

  #edit user()
  addTask(taskName: String!, startDate: String!, interval: Int!, taskWho: String!): Task!
  #delete task

  addUsersToEditTask(id: ID!, name: String):Task!

  editTask(id: ID!, taskName: String, startDate: String, interval: Int): Task!

  newGame(startDate: String!, endDate: String!): Game! 



  }
`;
module.exports= typeDefs;