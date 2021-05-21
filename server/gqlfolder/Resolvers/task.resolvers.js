const { Task } = require("../../db/schemas");

export const resolvers = {
  getTask: async (obj, args) => {
    try {
      const gotTask = await Task.find({ taskName: args.taskName });
      return gotTask;
    } catch (err) {
      console.log(err);
    }
  },

  getAllTasks: async (obj, args) => {
    try {
      if (args.mon && args.sun && !args.taskWho) {
        const unfiltered = await Task.find({});
        const filtered = unfiltered.filter(
          (task) => (task.startDate > args.mon) & (task.startDate < args.sun)
        );
        return filtered;
      } else if (args.mon && args.sun && args.taskWho) {
        const all = await Task.find({});
        const filteredByName = all.filter(
          (task) => task.taskWho === args.taskWho
        );
        return filteredByName;
      } else {
        allTasks = await Task.find({});
        return allTasks;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
