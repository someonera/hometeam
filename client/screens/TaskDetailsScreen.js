import React, { useReducer, useState } from "react";
import { ScrollView, Text, View, TextInput, SafeAreaView , Alert} from "react-native";
import {Switch, Card, Button, CheckBox, Input} from "react-native-elements";
const styles = require("../styles/styles");
import { gql, useQuery, useMutation } from "@apollo/client";
import EditableText from "react-native-inline-edit";
import CalendarPicker from "react-native-calendar-picker";
import {Picker} from '@react-native-picker/picker';
import moment from 'moment'

const ADD_NEW_TASK = gql`
  mutation addTask ($taskName: String!, $startDate: String!, $interval: Int!, $taskWho: String!){
    addTask(taskName: $taskName, startDate: $startDate, interval: $interval, taskWho: $taskWho) {
      taskName
    }
  }
`; 

const EDIT_TASK = gql `
  mutation editTask($id: ID!, $taskName: String, $startDate: String, $interval: Int) {
    editTask(id: $id, taskName: $taskName, startDate: $startDate, interval: $interval) {
      taskName
      id
      startDate
      interval
    }
  }
`;

const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      name
      id 
    }
  }
`

const ADD_USER_TO_TASK = gql`
  mutation addUsersToEditTask($id: ID!, $name: String) {
    addUsersToEditTask(id: $id, name: $name) {
      taskName
      taskWho
    }
  }

`

export function TaskDetailsScreen({route, navigation}) {

  const [addTask, {load, err, taskData}] = useMutation(ADD_NEW_TASK);
  const [editTask, {loadtask, errtask, editData}] = useMutation(EDIT_TASK); 
  const [addUsersToEditTask, {loadd, errd, editUserData}] = useMutation(ADD_USER_TO_TASK); 


  const {taskName, id, startDate, interval, taskWho} = route.params


  const [title, setTitle] = React.useState(taskName === "" ? "New Task Name" : taskName.taskName);
  const [taskId, setTaskId] = React.useState((id === "") ? "" : id.id);
  const [taskStartDate, setTaskStartDate] = React.useState((startDate === "") ? moment() : startDate.startDate);
  const [taskInterval, setTaskInterval] = React.useState((interval === "") ? "7" : interval.interval);
  const [taskAlloc, setTaskAlloc] = React.useState((taskWho === "") ? "" : taskWho.taskWho); 
  console.log("taskAlloc:", taskAlloc)
  
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (loading ) return <Text>loading </Text>;
  if (error ) return <Text>{error}</Text>;
  
  const disableDates = (date) => {
    const today = moment(); 
    if (moment(date).isBefore(today)) return true;
  }

  const onDateChange = (date) => {
    setTaskStartDate(date.format());
  };

  const submit = e => {
    e.preventDefault(); 
    if (taskId) {
      editTask({variables: {id: taskId, taskName: title, startDate: taskStartDate, taskWho: taskAlloc, interval: parseInt(taskInterval)}});
      addUsersToEditTask({variables: {id: taskId, name: taskAlloc}})
    } else {
      addTask({variables: {taskName: title, startDate: taskStartDate, taskWho: taskAlloc, interval: parseInt(taskInterval)}}); 
    }
  };

  return (
    <ScrollView>
    <Card containerStyle={{height:"95%"}}>
        

    <View style={{ 
        flexDirection: "row", 
        // alignItems: "center", 
        justifyContent: "space-between"
        }}>
          <SafeAreaView>
          <TextInput 
            styles={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </SafeAreaView>
      

        <Switch></Switch>
    </View>
    <Picker
          style={styles.picker}
          itemStyle={{height: 110}}
          selectedValue={taskInterval}
          onValueChange={(itemValue) => 
            setTaskInterval(itemValue)
          }>
            <Picker.Item label="every day" value="1" />
            <Picker.Item label="every week" value="7" />
            <Picker.Item label="every two weeks" value="14" />
            <Picker.Item label="every month" value="28" />

      </Picker>

    <Picker
      style={styles.picker}
      itemStyle={{height: 110}}
      selectedValue={taskAlloc}
      onValueChange={(itemValue)=> setTaskAlloc(itemValue)}
    >
        {data.getAllUsers.map(({name, id}) => (
          <Picker.Item key={id} label={name} value={name}/>
        ))}

    </Picker> 
  
    <Card.Divider/>

    <Text> Select Start Date: </Text>
    <CalendarPicker
      selectedStartDate={taskStartDate}
      disabledDates={disableDates}
      onDateChange={onDateChange}
    ></CalendarPicker>

    <View
    flexDirection= "row"
    >
    <Button title={"Save Changes"} onPress={submit}></Button>
    <Button title={"Discard Changes"} onPress={() => navigation.navigate("Tasks")}></Button>

    </View>

    </Card>
    </ScrollView>
  );
}