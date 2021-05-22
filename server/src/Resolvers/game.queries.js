import { Game } from "../Models/types.js";

export const resolvers = {
  Query: {
    getGame: async (obj, args) => {
      try {
        const thisGame = await Game.findOne({ endDate: args.endDate });
        return thisGame;
      } catch (err) {
        console.log(err);
      }
    },

    getAllPastGames: async (obj, args) => {
      try {
        const allGames = await Game.find({});
        const result = allGames.filter((item) => item.endDate !== args.endDate);
        return result;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
