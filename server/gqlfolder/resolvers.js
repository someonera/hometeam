const { User, Task }  = require('../db/schemas')
// const Task  = require('../db/schemas')

const resolvers = {

  Query: {
    getUser: async (obj, args) => {
      try {
      const gotUser = await User.find({name: args.name});
      console.log(gotUser)
      return gotUser 
    } catch (err) {
      console.log(err)
    }
  }, 

  getAllUsers: async (obj) => {
    try {
      const allUsers = await User.find({});
      console.log('hello')
      return allUsers
    } catch (err) {
      console.log(err)
    }
  }, 

  getTask: async (obj, args) => {
    try {
      const gotTask = await Task.find({taskName: args.taskName});
      return(gotTask)
    } catch (err) {
      console.log(err)
    }
  }, 

  getAllTasks: async (obj) => {
    try {
      const allTasks = await Task.find({});
      return allTasks
    } catch (err) {
      console.log(err)
    }
  }

},

  Mutation: {
    addUser: async (obj, args) => {
      try {
      const addedUser = await User.create({name: args.name})
      console.log(addedUser)
      return addedUser
    } catch (err) {
      console.log(err)
    }
    }
  , 

  addTask: async (obj, args) => {
    try {
      const addedTask = await Task.create({taskName: args.taskName})
      console.log(args)
      return addedTask

    } catch(err) {
      console.log(err)
      }
    }
  }
}


module.exports = resolvers;