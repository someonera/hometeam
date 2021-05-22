import { User } from "../Models/types.js";

export const resolvers = {
  Query: {
    getUser: async (obj, args) => {
      try {
        const gotUser = await User.find({ name: args.name });
        return gotUser;
      } catch (err) {
        console.log(err);
      }
    },

    getAllUsers: async (obj, args) => {
      try {
        const allUsers = await User.find({});
        return allUsers;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
