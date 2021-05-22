export const typeDef = `
type Task {
  taskName: String
  taskWho: String
  taskDesc: String
  interval: Int
  id: ID
  startDate: String
  done: Boolean
}

extend type Query {
  getTask(taskName: String!): [Task!]
  getAllTasks(
    mon: String
    sun: String
    taskWho: String
    done: Boolean
  ): [Task!]
  }
    


 extend type Mutation {

    addTask(
      taskName: String!
      startDate: String!
      interval: Int!
      taskWho: String!
    ): Task!

    addUsersToEditTask(id: ID!, name: String): Task!

    editTask(id: ID!, taskName: String, startDate: String, interval: Int): Task!
    }
`;
