import React, { useReducer, useState } from "react";
import { Text, View, TextInput, SafeAreaView } from "react-native";
import {Card, Button, CheckBox, Input} from "react-native-elements";
const styles = require("../styles/styles");
import { gql, useQuery, useMutation } from "@apollo/client";
import EditableText from "react-native-inline-edit";
import CalendarPicker from "react-native-calendar-picker";
import GET_ALL_TASKS from "./TasksScreen"

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
`;

const ADD_NEW_TASK = gql`
  mutation addTask ($taskName: String!){
    addTask(taskName: $taskName) {
      taskName
    }
  }
`; 

const EDIT_TASK = gql `
  mutation editTask($id: ID!, $taskName: String) {
    editTask(id: $id, taskName: $taskName) {
      taskName
      id
    }
  }
`;

export function TaskDetailsScreen({route, navigation}) {

  const taskTitle = route.params.taskName;
  const task_id = (route.params.id === "USER_ENTERING_NEW_TASK") ? "" : route.params.id.id; 

  const [title, setTitle] = React.useState(taskTitle === "USER_ENTERING_NEW_TASK" ? "" : taskTitle.taskName);
  
  const [addTask, {load, err, taskData}] = useMutation(ADD_NEW_TASK);
  const [editTask, {loadtask, errtask, editData}] = useMutation(EDIT_TASK, {refetchQueries: GET_ALL_TASKS}); 

  const { loading, error, data } = useQuery(GET_TASK, { variables: { taskName: title }} );

  if (error) return <Text>`Error! ${error.message}`</Text>;
  if (err) return <Text>`That task already exists! ${error.message}`</Text>;

  const submit = e => {
    e.preventDefault(); 
    if (task_id) {
      /// if there is an id, you were editing a task, so, send the changes back to the task with this id
      editTask({variables: {id: task_id, taskName: title}});
    } else {
      // if there is no id, it was a new task, create a task with this id and the variables 
      addTask({variables: {taskName: title}}); 
    }
  };

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
    <Text> Set the start Date </Text>
    <CalendarPicker></CalendarPicker>
    
    <Button title={"Save Changes"} onPress={submit}></Button>
    <Button title={"Discard Changes"} onPress={() => navigation.navigate('Tasks')}></Button>

    </Card>
  );
}