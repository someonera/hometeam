import makeExecutableSchema from "graphql-tools";

import { typeDef as User } from "./user.schema.js";
import { typeDef as Task } from "./task.schema.js";
import { typeDef as Game } from "./game.schema.js";
import { typeDef as TaskInput } from "./taskInput.schema.js";

import Query from "./query.schema.js";
import Mutation from "./mutation.schema.js";

makeExecutableSchema({
  typeDefs: [Query, Mutation, TaskInput, User, Task, Game],
  resolvers: {},
});
