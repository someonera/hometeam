import React from "react";
import  ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import 'react-native-gesture-handler';

import { createStackNavigator } from "@react-navigation/stack"; 
import { NavigationContainer } from "@react-navigation/native";

import {ThemeProvider, Button} from "react-native-elements";
const { theme } = require("./styles/Theme");

const { HomeScreen } = require("./screens/HomeScreen");
const { TasksScreen } = require("./screens/TasksScreen");
const { TeamMatesScreen } = require("./screens/TeamMatesScreen");
const { AddTeamMateScreen } = require("./screens/AddTeamMateScreen");
const { TaskDetailsScreen } = require("./screens/TaskDetailsScreen");
const { UserDetailsScreen } = require("./screens/UserDetailsScreen");
const { GameScreen } = require("./screens/GameScreen");
const { StatsScreen } = require("./screens/StatsScreen");


const {screenOptions} = require("./styles/headerstyles");

const client = new ApolloClient({
  uri: "http://192.168.1.124:4000"
});

const Stack = createStackNavigator();


function TeamStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name ="TeamMates" component={TeamMatesScreen} />
      <Stack.Screen name="AddTeamMate" component={AddTeamMateScreen} />
      <Stack.Screen name='UserDetails' component={UserDetailsScreen} />
    </Stack.Navigator>
  );
}

function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name ="Tasks" component={TasksScreen}/>
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen}/>
    </Stack.Navigator>
  );
}

function GameStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ThisGame" component={GameScreen}/> 
    </Stack.Navigator>
  )
}

function StatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PastStats" component={StatsScreen}/> 
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TasksTabs" component={TasksStack} />
        <Stack.Screen name="TeamMates" component={TeamStack} />
        <Stack.Screen name="Game" component={GameStack}/> 
        <Stack.Screen name="Stats" component={StatsStack}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
    </ApolloProvider>
  );
}
