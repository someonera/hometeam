import React, { useReducer } from 'react';
import { Text, View } from 'react-native';
const styles = require('../styles/styles')
import { gql, useQuery } from '@apollo/client'

// get all task details from the database if you're coming from editing
// or not if you're coming from the add new task thing 

// then: 

export function TaskDetailsScreen({route, navigation}) {

  console.log(route.params)
  
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}