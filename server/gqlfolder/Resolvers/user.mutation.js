import { User } from "../../db/schemas.js";

export const resolvers = {
  Mutation: {
    addUser: async (obj, args) => {
      try {
        const userCheck = await User.findOne({ name: args.name });
        if (!userCheck) {
          const addedUser = await User.create({ name: args.name });
          return addedUser;
        }
        return userCheck;
      } catch (err) {
        return err;
      }
    },
  },
};
