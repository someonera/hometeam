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
`;
