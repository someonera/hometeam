import { Task, Game, User } from "../../db/schemas.js";
import moment from "moment";

export const resolvers = {
  Mutation: {
    addTask: async (obj, args) => {
      try {
        const nextSunday = moment(args.startDate).endOf("isoWeek");

        const taskCheck = await Task.findOne({ taskName: args.taskName });
        const userCheck = await User.findOne({ name: args.taskWho });
        const gameCheck = await Game.findOne({
          endDate: { $gte: args.startDate },
        });

        if (!taskCheck) {
          const addedTask = await Task.create({
            taskName: args.taskName,
            startDate: args.startDate,
            interval: args.interval,
            taskWho: args.taskWho,
            done: false,
          });

          if (gameCheck) {
            await Game.findByIdAndUpdate(gameCheck.id, {
              gameTasks: [...gameCheck.gameTasks, addedTask],
            });
          }

          await User.findByIdAndUpdate(
            userCheck.id,
            { tasks: [...userCheck.tasks, addedTask] },
            { new: true }
          );

          return addedTask;
        }
      } catch (err) {
        return err;
      }
    },

    editTask: async (obj, args) => {
      try {
        const taskCheck = await Task.findOne({ _id: args.id });

        if (taskCheck) {
          const editedTask = await Task.findByIdAndUpdate(taskCheck.id, {
            startDate: args.startDate ? args.startDate : taskCheck.startDate,
            taskName: args.taskName ? args.taskName : taskCheck.taskName,
            interval: args.interval ? args.interval : taskCheck.interval,
          });
          return editedTask;
        }
      } catch (err) {
        console.log(err);
      }
    },

    addUsersToEditTask: async (obj, args) => {
      try {
        const taskCheck = await Task.findOne({ _id: args.id }); /// this is the task that you got with this ID

        const tempUser = await User.findOne({ name: args.name }); // this is the new user you're allocating the task to
        if (taskCheck.taskWho === args.name) return taskCheck;

        // update the user name in the task
        const addedNameToTask = await Task.findByIdAndUpdate(
          args.id,
          { taskWho: args.name },
          { new: true }
        );

        if (
          !tempUser.tasks.some((task) => task.taskName === taskCheck.taskName)
        ) {
          // if the new user didn't already have this task
          await User.findByIdAndUpdate(
            tempUser.id,
            { tasks: [...tempUser.tasks, addedNameToTask] },
            { new: true }
          );
        }

        if (taskCheck.taskWho !== undefined) {
          if (taskCheck.taskWho !== tempUser.name) {
            const oldUser = await User.findOne({ name: taskCheck.taskWho });
            const oldUserNewTasksArray = oldUser.tasks.filter(
              (task) => task.taskName !== taskCheck.taskName
            );
            await User.findByIdAndUpdate(
              oldUser.id,
              {
                tasks: oldUserNewTasksArray,
              },
              { new: true }
            );
          }
        }
        return addedNameToTask;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
