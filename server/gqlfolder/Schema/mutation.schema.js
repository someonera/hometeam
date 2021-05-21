export const Mutation = `
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
