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

  #edit user()
  addTask(taskName: String!, startDate: String!, interval: Int!, taskWho: String!): Task!
  #delete task

  addUsersToEditTask(id: ID!, name: String):Task!


  addUsersToNewTask( taskName:String!, name:String!):Task!

  editTask(id: ID!, taskName: String, startDate: String, interval: Int): Task!

  }
`;
module.exports= typeDefs;