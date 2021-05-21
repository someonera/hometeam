export const Query = `
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
`;
