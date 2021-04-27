import React, { useReducer, useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, SafeAreaView , Alert} from "react-native";
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

  const [addTask, {loading: addLoad, error: addErr, data: addData}] = useMutation(ADD_NEW_TASK);
  const [editTask, {loading: editLoading, error: editError, data: editData}] = useMutation(EDIT_TASK); 
  const [addUsersToEditTask, {loading: usersLoading, error: usersError, data: usersData}] = useMutation(ADD_USER_TO_TASK); 


  const {taskName, id, startDate, interval, taskWho} = route.params


  const [title, setTitle] = React.useState(taskName === "" ? "New Task Name" : taskName.taskName);
  const [taskId, setTaskId] = React.useState((id === "") ? "" : id.id);
  const [taskStartDate, setTaskStartDate] = React.useState((startDate === "") ? moment() : startDate.startDate);
  const [taskInterval, setTaskInterval] = React.useState((interval === "") ? "7" : interval.interval);
  const [taskAlloc, setTaskAlloc] = React.useState((taskWho === "") ? "Parent" : taskWho.taskWho); 
  
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
      navigation.navigate("Our Goals")
    } else {
      addTask({variables: {taskName: title, startDate: taskStartDate, taskWho: taskAlloc, interval: parseInt(taskInterval)}}); 
      navigation.navigate("Our Goals")
    }
  };

  return (
    <Card containerStyle={{height:"95%"}}>
        
      <SafeAreaView>
      <TextInput 
        fontSize={35}
        styles={styles.textInput}
        value={title}
        onChangeText={setTitle}
      />
    </SafeAreaView>

    <View style={{ 
        flexDirection: "row", 
        // alignItems: "center", 
        justifyContent: "space-around"
        }}>
    <Picker
          style={styles.picker}
          itemStyle={{height: 110}}
          selectedValue={taskInterval.toString()}
          onValueChange={(itemValue) => 
            setTaskInterval(itemValue)
          }>
            {/* <Picker.Item label="once" value="0"/> */}
            {/* <Picker.Item label="daily" value="1" /> */}
            <Picker.Item label="weekly" value="7" />
            <Picker.Item label="fortnightly" value="14" />
            <Picker.Item label="monthly" value="28" />

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
      
    </View>
  
    <Card.Divider/>

    <CalendarPicker
      selectedStartDate={taskStartDate}
      disabledDates={disableDates}
      onDateChange={onDateChange}
    ></CalendarPicker>

    <Card.Divider/>

      <View style={{
        flexDirection: "row", 
        justifyContent: "space-around"
        }}>
        <Button title={"Save Changes"} onPress={submit}></Button>
        <Button title={"Discard Changes"} onPress={() => navigation.navigate("Our Goals")}></Button>

      </View>

    </Card>
  );
}

