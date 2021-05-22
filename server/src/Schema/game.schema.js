export const typeDef = `
type Game {
  startDate: String
  endDate: String
  score: Int
  gameTasks: [Task]
  players: [User]
  doneTasks: [Task]
  notDoneTasks: [Task]
  id: ID  
}

extend type Query {
  getGame(endDate: String!): Game
  getAllPastGames(endDate: String!): [Game]
}

extend type Mutation {
  newGame(startDate: String!, endDate: String!, gameTasks: [TaskInput]): Game!
  checkTask(taskName: String!, endDate: String!): Boolean
}

`;
