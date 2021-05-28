# HomeTeam: your house doesn't have to win!

## The app 
HomeTeam is a fun task-management app for families and housemates - uniting you against your true enemy, mess!
Create your team's tasks, assign them a date and a user, and the app will generate a weekly game with each task representing a shot on goal for the whole team. Any tasks left undone count as goals for the opposing team - your house.

<code><img alt="React Native" src="https://img.shields.io/badge/-React%20Native-61dafb?logo=react&logoColor=white&style=for-the-badge"></code>
<code><img alt="Expo" src="https://img.shields.io/badge/-expo-000020?logo=expo&logoColor=white&style=for-the-badge"></code>
<code><img alt="CSS3" src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge"></code>
<code><img alt="GraphQL" src="https://img.shields.io/badge/-GraphQL-e434aa?logo=graphql&logoColor=white&style=for-the-badge"></code>
<code><img alt="Apollo GraphQL" src="https://img.shields.io/badge/-Apollo%20GraphQL-311c87?logo=apollo-graphql&logoColor=white&style=for-the-badge"></code>
<code><img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47a248?logo=mongoDB&logoColor=white&style=for-the-badge"></code>
<code><img alt="Mongoose" src="https://img.shields.io/badge/-Mongoose-300D4f?logo=mongoDB&logoColor=white&style=for-the-badge"></code>


## Features

HomeTeam allows unlimited tasks to be added, given a start date and an interval, and allocated to a single member of the team. 

Each user sees their tasks for that week in their "You've got the ball!" screen, allowing children (or adults) to easily manage and understand what their responsibilities are at any time. A new game is generated each week where the current status of the game underway is shown, and previous games and scores can be also be explored.

## Tech Stack

### Front end

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.io/)
* [ApolloClient](https://www.apollographql.com/)

### Back end

* [ApolloServer](https://www.apollographql.com/)
* [GraphQL](https://www.graphql.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

## Getting Started

To get up and running it’s first necessary to install all dependencies.

`git clone https://github.com/someonera/hometeam`
`cd hometeam && npm i`

### Running the server

* PORT is the only environment variable needed on the backend. Create a .env file in the server folder and store your port number there. See .env.example.

* Run `node index.js` from server/src

### Setting up the frontend

* There are two environment variables to set up on the frontend: APOLLO_CLIENT_HOST and APOLLO_CLIENT_PORT (which should be the same as PORT on the backend). Install [Expo](https://expo.io/) and run `ipconfig getifaddr en0` in the terminal to find out your IP address to run the app on expo on your phone - see .env.example.

* Run `npm run start-dev` in client/src


## Built By
| <img src="https://avatars.githubusercontent.com/u/74319526?v=4" width="70" alt="Ro" /> 
--- | 
**Ro Thomas** 
[LinkedIn](https://www.linkedin.com/in/romthomas/)
[GitHub](https://github.com/someonera) 
