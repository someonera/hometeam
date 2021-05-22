import { Game, Task } from "../Models/types.js";

export const resolvers = {
  Mutation: {
    newGame: async (obj, args) => {
      try {
        const arrayOfTasks = [];
        for (const item of args.gameTasks) {
          const waitingTask = await Task.findOne({ taskName: item.taskName });
          arrayOfTasks.push(waitingTask);
        }

        const gameCheck = await Game.findOne({ startDate: args.startDate });
        if (!gameCheck) {
          const newGame = await Game.create({
            startDate: args.startDate,
            endDate: args.endDate,
            score: 0,
            gameTasks: arrayOfTasks,
          });
          return newGame;
        } else {
          return gameCheck;
        }
      } catch (err) {
        console.log(err);
      }
    },

    checkTask: async (obj, args) => {
      try {
        const game = await Game.findOne({ endDate: args.endDate });
        let toggle;
        let scoreUpdate = game.score;
        const editTasks = game.gameTasks.map((item) => {
          if (item.taskName === args.taskName) {
            toggle = !item.done;
            item.done = !item.done;
            if (toggle === true) {
              scoreUpdate++;
            } else scoreUpdate--;
          }
          return item;
        });

        await Game.findByIdAndUpdate(game.id, {
          gameTasks: editTasks,
          score: scoreUpdate,
        });
        return toggle;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
