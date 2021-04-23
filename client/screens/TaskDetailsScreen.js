import React, { useReducer, useState } from 'react';
import { Text, View, TextInput, SafeAreaView } from 'react-native';
import {Card, Button, CheckBox, Input} from 'react-native-elements'
const styles = require('../styles/styles')
import { gql, useQuery } from '@apollo/client'
import EditableText from 'react-native-inline-edit'


const GET_TASK = gql`
  query ($taskName: String!){
    getTask (taskName: $taskName){
      taskName
      taskWho {
        name
      }
      id
    }
  }
`


export function TaskDetailsScreen({route, navigation}) {

  const taskTitle = route.params.taskName

  const [title, setTitle] = useState(taskTitle === "USER_ENTERING_NEW_TASK" ? " " : taskTitle.taskName)

  const { loading, error, data } = useQuery(GET_TASK, { variables: { taskName: title }} )

  if (loading) return <Text> 'Loading...';</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  return (
    <Card containerStyle={{height:"95%"}}>

        <SafeAreaView>
          <TextInput 
            styles={styles.input}
            value={title}
            onChangeText={setTitle}
          />

            <Card.Divider/>


        <TextInput
          value={"description here gotta do the set state"}
        />
        </SafeAreaView>
  
    
  <Card.Divider/>
    <View>
      <Text>Who Does This Task?</Text>
      <CheckBox></CheckBox>
    </View>
    
    <Button title={"save changes"}></Button>
    <Button title={"don't save changes"}></Button>

    </Card>
  )
}