import React, { useReducer } from 'react';
import { Text, View } from 'react-native';


import List from '../components/List'
import { actionCreators, reducer, initialState } from '../todos'


export function TasksScreen({route, navigation}) {

  /// you can destructure the route params here 
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <View>

      <Text>Tasks!</Text>
      
    </View>
  )
  
}