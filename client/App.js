import React from 'react';
import  ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { createStackNavigator } from '@react-navigation/stack'; 
import { NavigationContainer } from '@react-navigation/native'


const { HomeScreen } = require('./screens/HomeScreen')
const { TasksScreen } = require('./screens/TasksScreen')
const { TeamMatesScreen } = require('./screens/TeamMatesScreen')
const { AddTeamMateScreen } = require('./screens/AddTeamMateScreen')


const {screenOptions} = require('./styles/headerstyles')


const client = new ApolloClient({
  uri: 'http://192.168.1.124:4000'
})


const Stack = createStackNavigator()
const Tab = createStackNavigator()

function TeamScreens() {
  return (
    <Tab.Navigator>
      <Tab.Screen name ="TeamMates" component={TeamMatesScreen} />
      <Tab.Screen name="AddTeamMate" component={AddTeamMateScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="TeamMates" component={TeamScreens} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
};