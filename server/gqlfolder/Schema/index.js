import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDef as User } from "./user.schema.js";
import { typeDef as Task } from "./task.schema.js";

import { typeDef as Game } from "./game.schema.js";
import { typeDef as TaskInput } from "./taskInput.schema.js";

import { mergedResolvers } from "../Resolvers/index.js";

const Mutation = `
  type Mutation {
    _empty: String
  }
`;

const Query = `
  type Query {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, Mutation, TaskInput, User, Task, Game],
  resolvers: mergedResolvers,
});
