const User = require('../db/schemas')

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
  }
}


module.exports = resolvers;