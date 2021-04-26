const { User, Task }  = require("../db/schemas");
// const Task  = require('../db/schemas')

const resolvers = {

  Query: {
    getUser: async (obj, args) => {
      try {
      const gotUser = await User.find({name: args.name});
      console.log(gotUser);
      return gotUser; 
    } catch (err) {
      console.log(err);
    }
  }, 

  getAllUsers: async (obj) => {
    try {
      const allUsers = await User.find({});
      return allUsers;
    } catch (err) {
      console.log(err);
    }
  }, 

  getTask: async (obj, args) => {
    try {
      const gotTask = await Task.find({taskName: args.taskName});
      return(gotTask);
    } catch (err) {
      console.log(err);
    }
  }, 

  getAllTasks: async (obj) => {
    try {
      const allTasks = await Task.find({});
      return allTasks;
    } catch (err) {
      console.log(err);
    }
  }

},

  Mutation: {
    addUser: async (obj, args) => {
      try {
      const userCheck = await User.findOne({name: args.name});
      if (!userCheck) {
        const addedUser = await User.create({name: args.name});
        console.log(addedUser);
        return addedUser;
      }
    return userCheck;
    } catch (err) {
      return(err);
    }
    }
  , 

  addTask: async (obj, args) => {
    try {
      const taskCheck = await Task.findOne({taskName: args.taskName}); 
      const userCheck = await User.findOne({name: args.taskWho})
      if (!taskCheck) {
      const addedTask = await Task.create({
        taskName: args.taskName, 
        startDate: args.startDate,
        interval: args.interval, 
        taskWho: [userCheck]
      });
      return addedTask;
      }
    } catch (err) {
      return(err);
      }
    }, 

  editTask: async (obj, args) => {
    try {

      const taskCheck = await Task.findOne({_id: args.id}); 

      if (taskCheck) {
        const editedTask = await Task.findByIdAndUpdate(taskCheck.id, {
          startDate: (args.startDate ? args.startDate : taskCheck.startDate), 
          taskName: (args.taskName ? args.taskName : taskCheck.taskName), 
          interval: (args.interval ? args.interval : taskCheck.interval), 

        }
        ); 
        return editedTask; 
      }
    } catch (err) {
      console.log (err);
    }
  },
  

  addUsersToEditTask: async (obj, args) => {
      try {
        const taskCheck = await Task.findOne({_id: args.id}); /// this is the task that you got with this ID

        const tempUser = await User.findOne({name: args.name}); // this is the new user you're allocating the task to
        if (taskCheck.taskWho === args.name) return taskCheck
        
        console.log("taskWHo name:", taskCheck.taskWho); 
        console.log("tempuser:", tempUser); 

        // update the user name in the task 
        const addedNameToTask = await Task.findByIdAndUpdate(args.id, {taskWho: args.name}, {new: true}); 

        console.log(tempUser.tasks)
        if (!(tempUser.tasks).some(task => task.taskName === taskCheck.taskName)) { // if the new user didn't already have this task
          await User.findByIdAndUpdate(tempUser.id, {tasks:[...tempUser.tasks, addedNameToTask]}, {new: true});
        }

        if (taskCheck.taskWho !== undefined) {
          console.log(taskCheck.taskWho)
          console.log("hello"); 
          if (taskCheck.taskWho !== tempUser.name) {
            const oldUser = await User.findOne({name: taskCheck.taskWho}); 
            const oldUserNewTasksArray = (oldUser.tasks).filter(task => task.taskName !== taskCheck.taskName) 
            await User.findByIdAndUpdate(oldUser.id, {
            tasks: oldUserNewTasksArray
            }, {new: true});
          }
        }
        return addedNameToTask;
       // end of try statement
      } catch(err) {
        console.log(err);
        }
      }, 



  }
};


module.exports = resolvers;