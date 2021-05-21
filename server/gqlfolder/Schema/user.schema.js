export const typeDef = `
type User {
    name: String
    tasks: [Task]
    numOfTasks: Int
    completedThisGame: Int
    completedEver: Int
    id: ID
  }

  extend type Query {
      getUser(name: String!): [User!]
      getAllUsers: [User!]
  }

  extend type Mutation {
    addUser(name: String!): User!
  }
`;
