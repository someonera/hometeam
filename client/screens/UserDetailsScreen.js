import React, { useReducer, useState } from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import {Card, Button, CheckBox, Input} from "react-native-elements";
const styles = require("../styles/styles");
import { gql, useQuery } from "@apollo/client";
import EditableText from "react-native-inline-edit";


const GET_USER = gql`
  query ($name: String!){
    getUser (name: $name){
      name
      tasks {
        taskName
      }
      id
    }
  }
`;




export function UserDetailsScreen({route, navigation}) {

  const userTitle = route.params.name;

  const [title, setTitle] = useState(userTitle === "USER_ENTERING_NEW_USER" ? " " : userTitle.name);

  const { loading, error, data } = useQuery(GET_USER, { variables: { name: title }} );

  if (loading) return <Text> 'Loading...';</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <Card containerStyle={{height:"95%"}}>

        <SafeAreaView>
          <TextInput 
            styles={styles.input}
            value={title}
            onChangeText={setTitle}
          />

            <Card.Divider/>


        
        </SafeAreaView>
  
    
  <Card.Divider/>
    <View>
      <Text>User skills: list the tasks this user does  </Text>
      <Text> and give them an icon based on their level  </Text>

    </View>
    
    <Button title={"Save Changes"}></Button>
    <Button title={"Discard Changes"}></Button>
    <Button title={"Delete This User"}/>

    </Card>
  );
}