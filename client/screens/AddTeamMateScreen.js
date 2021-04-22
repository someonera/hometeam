import React, { useReducer } from 'react';
import { Text, TextInput, View, Button , TouchableOpacity} from 'react-native';
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
  const [addUser, {loading, error, data} ] = useMutation(ADD_NEW_USER);


  const submit = e => {
    e.preventDefault();
    addUser({variables: {name : input}})
    input = ''
  }

  return (
    <View>
      <Text>New Team Mate: </Text>


      <TextInput
        editable = {true}
        style={{height: 40}}
        editable = { true }
      />
      <TouchableOpacity title="ADD" style={styles.box} onPress={submit}>
        <Text> ADD </Text>
      </TouchableOpacity>
      
          
    </View>
  )
  
}