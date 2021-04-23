import React, { useReducer, useState} from 'react';
import { Text, TextInput, View, Button , TouchableOpacity} from 'react-native';
const styles = require('../styles/styles');
import {gql, useMutation } from '@apollo/client'

/// either GET an existing user if you're coming from a user name 
/// or Have the details blank if you're coming from "Add user"


const ADD_NEW_USER = gql `
  mutation addUser ($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`

export function AddTeamMateScreen({route, navigation}) {

  const [input, setInput] = useState("")
  const [addUser, {loading, error, data} ] = useMutation(ADD_NEW_USER);


  const submit = e => {
    e.preventDefault();
    console.log(input)
    addUser({variables: {name : input}})
  }

  return (
    <View>
      <Text>New Team Mate: </Text>

      <TextInput
        editable = {true}
        style={{height: 40}}
        editable = { true }
        value = {input}
        onChangeText = {setInput} 
      />

      <TouchableOpacity title="ADD" style={styles.box} onPress={submit}>
        <Text> ADD </Text>
      </TouchableOpacity>
      
          
    </View>
  )
  
}