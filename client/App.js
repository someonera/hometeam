import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "react-native-gesture-handler";
import { APOLLO_CLIENT_HOST, APOLLO_CLIENT_PORT } from "@env";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "react-native-elements";
import { theme } from "./src/styles/Theme";

import { HomeScreen } from "./src/screens/HomeScreen";
import { TasksScreen } from "./src/screens/TasksScreen";
import { TeamMatesScreen } from "./src/screens/TeamMatesScreen";
import { AddTeamMateScreen } from "./src/screens/AddTeamMateScreen";
import { TaskDetailsScreen } from "./src/screens/TaskDetailsScreen";
import { UserDetailsScreen } from "./src/screens/UserDetailsScreen";
import { GameScreen } from "./src/screens/GameScreen";
import { StatsScreen } from "./src/screens/StatsScreen";
import { GotTheBallScreen } from "./src/screens/GotTheBallScreen";

import { screenOptions } from "./src/styles/headerstyles";

const client = new ApolloClient({
  uri: `${process.env.APOLLO_CLIENT_HOST}${process.env.APOLLO_CLIENT_PORT}`,
});

const Stack = createStackNavigator();

function TeamStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamMates" component={TeamMatesScreen} />
      <Stack.Screen name="AddTeamMate" component={AddTeamMateScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
    </Stack.Navigator>
  );
}

function TasksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Our Goals" component={TasksScreen} />
      <Stack.Screen name="Goal Details" component={TaskDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TasksTabs" component={TasksStack} />
            <Stack.Screen name="TeamMates" component={TeamStack} />
            <Stack.Screen name="This Week's Match" component={GameScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="GotTheBall" component={GotTheBallScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
