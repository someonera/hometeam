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
      // const userCheck = await User.findOne({name: args.taskWho})
      console.log(userCheck)
      if (taskCheck) {
        const editedTask = await Task.findByIdAndUpdate(taskCheck.id, {
          startDate: (args.startDate ? args.startDate : taskCheck.startDate), 
          taskName: (args.taskName ? args.taskName : taskCheck.taskName), 
          interval: (args.interval ? args.interval : taskCheck.interval), 
          // taskWho: [userCheck],
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
        const taskCheck = await Task.findOne({_id: args.id});
        const tempUser = await User.findOne({name: args.name});
        // console.log(taskCheck.taskWho)
        const oldName = taskCheck.taskWho === [] ? 0 : 1  //did this task previously have a user?
        const oldUser = oldName ? await User.findOne({name: oldName}) : args.name;
        console.log("oldUser tasks:", oldUser.tasks)
        console.log(oldUser)

        console.log("this is check who", taskCheck.taskWho[0].name)
        console.log("this is user:",tempUser)
        if (taskCheck) {
              const userAddedTask = await Task.findByIdAndUpdate(taskCheck.id, {
                taskWho: tempUser
              })
          
            if (!(tempUser.tasks).some(task => task.taskName === taskCheck.taskName)) { // if the new user didn't already have this task
                  await User.findByIdAndUpdate(tempUser.id, {
                  tasks:[...tempUser.tasks, taskCheck]
              });
              // console.log(taskToUser)
            }
          
            if (oldUser !== tempUser) { // if this was a reallocation rather than a first allocation
                const oldUserNewTasksArray = (oldUser.tasks).filter(task => task.taskName !== taskCheck.taskName) //remove the task from the other user
                await User.findByIdAndUpdate(oldUser.id, {
                  tasks: oldUserNewTasksArray
                });
              }
          
            return userAddedTask;
        } // end of outer if statement
      } catch(err) {
        console.log(err);
        }
      }, 



  }
};


module.exports = resolvers;