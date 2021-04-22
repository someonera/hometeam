import React, { useReducer } from 'react';
import { Text, View } from 'react-native';
const styles = require('../styles/styles')
import { gql, useQuery } from '@apollo/client'


export function TaskDetailsScreen({route, navigation}) {

  console.log(route.params)
  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}