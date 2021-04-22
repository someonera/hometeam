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