import { mergeResolvers } from "@graphql-tools/merge";

import { resolvers as userQueryResolvers } from "./user.queries.js";

import { resolvers as userMutationResolvers } from "./user.mutation.js";

import { resolvers as taskQueryResolvers } from "./task.queries.js";
import { resolvers as taskMutationResolvers } from "./task.mutation.js";

import { resolvers as gameQueryResolvers } from "./game.queries.js";

import { resolvers as gameMutationResolvers } from "./game.mutation.js";

const resolvers = [
  userQueryResolvers,
  userMutationResolvers,
  taskQueryResolvers,
  taskMutationResolvers,
  gameQueryResolvers,
  gameMutationResolvers,
];

export const mergedResolvers = mergeResolvers(resolvers);
