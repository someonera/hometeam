import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const { HomeScreen } = require('./screens/HomeScreen')
const { TasksScreen } = require('./screens/TasksScreen')


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#57BF08",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen name = "Home" component={HomeScreen}/>
      <Stack.Screen name="Tasks" component={TasksScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

