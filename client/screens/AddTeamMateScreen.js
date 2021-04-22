import React, { useReducer } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
const styles = require('../styles/styles');
import {gql, useMutation } from '@apollo/client'

const ADD_NEW_USER = gql `
  mutation addUser ($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`

export function AddTeamMateScreen({route, navigation}) {
  let input; 
  const [addUser, {data} ] = useMutation(ADD_NEW_USER);

  return (
    <View>
      <Text>New Team Mate: </Text>
      <TextInput
        style={{height: 40}}
        placeholder="name"
      />
      <Button title="ADD" style={styles.box}/>
      
    </View>
  )
  
}