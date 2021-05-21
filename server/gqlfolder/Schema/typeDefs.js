const { gql } = require("apollo-server");


  input TaskInput {
    taskName: String
  }

  type Query {
    getUser(name: String!): [User!]
    getAllUsers: [User!]
    getTask(taskName: String!): [Task!]
    getAllTasks(
      mon: String
      sun: String
      taskWho: String
      done: Boolean
    ): [Task!]
    getGame(endDate: String!): Game
    getAllPastGames(endDate: String!): [Game]
  }

  type Mutation {
    addUser(name: String!): User!

    addTask(
      taskName: String!
      startDate: String!
      interval: Int!
      taskWho: String!
    ): Task!

    addUsersToEditTask(id: ID!, name: String): Task!

    editTask(id: ID!, taskName: String, startDate: String, interval: Int): Task!

    newGame(startDate: String!, endDate: String!, gameTasks: [TaskInput]): Game!

    checkTask(taskName: String!, endDate: String!): Boolean
  }
`;
module.exports = typeDefs;
