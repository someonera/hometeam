# hometeam

Chore management app for families and housemates - uniting you against your true enemy, mess!
Generates a weekly game based on repeating tasks allocated to specific users; each task is a shot on goal for the team member. Any tasks left undone count as goals for the opposing team, aka, your house.

# Features

Currently, HomeTeam allows unlimited tasks to be added, given a start date and an interval, and allocated to a single member of the team. Each user sees their tasks for that week in their "You've got the ball!" screen, allowing children (or adults) to easily manage and understand what their responsibilities are at any time. A new game is generated each week where the current status of the game underway is shown, and previous games and scores can be also be explored.

# Tech Stack

HomeTeam uses React Native with Expo for the front end, and the backend uses GraphQL with ApolloClient and MongoDB with Mongoose.

## Front end

React Native
Expo
ApolloClient

## Back end

ApolloServer
GraphQL
MongoDB
Mongoose

# Getting Started

To get up and running it’s first necessary to install all dependencies. This will install both the client and server dependencies for you.

git clone https://github.com/someonera/hometeam
cd hometeam && npm i

# Environment variables

PORT is the only environment variable needed on the backend. Create a .env file in the server folder and store your port number there. See .env.example.

# Running the server

npm run start-dev
Once all the other steps have been completed, from the src folder run

node index.js
or, if nodemon is installed (recommended)

npm run start dev

# Setting up the frontend

Environment variables
There are two environment variables to set up on the frontend: APOLLO_CLIENT_HOST and APOLLO_CLIENT_PORT.
You can run ipconfig getifaddr en0 in the terminal to find out your IP address to run the app on expo on your phone. See .env.example.

# Running the client

npm run start
