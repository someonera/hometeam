import React, { useReducer, useState} from "react";
import { Text, TextInput, View , TouchableOpacity, SafeAreaView} from "react-native";
const styles = require("../styles/styles");
import {gql, useMutation } from "@apollo/client";
import { Button, Card } from "react-native-elements";

/// either GET an existing user if you're coming from a user name 
/// or Have the details blank if you're coming from "Add user"


const ADD_NEW_USER = gql `
  mutation addUser ($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

export function AddTeamMateScreen({route, navigation}) {

  const [input, setInput] = useState("");
  const [addUser, {loading, error, data} ] = useMutation(ADD_NEW_USER);


  const submit = e => {
    e.preventDefault();
    console.log(input);
    addUser({variables: {name : input}});
  };

  return (

     
<Card containerStyle={{height:"95%"}}>
<Text>Add New Team Mate: </Text>

        <SafeAreaView>
        <TextInput
        editable = {true}
        style={{height: 40}}
        value = {input}
        onChangeText = {setInput} 
      />

            <Card.Divider/>
        
        </SafeAreaView>
  
    
  <Card.Divider/>
    <Text>You could add tasks to the user here </Text>    
    <Button title={"Add"} onPress={submit}></Button>
    <Button title={"Discard Changes"}></Button>

    </Card>

      
          
  );
  
}


