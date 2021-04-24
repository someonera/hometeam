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
  mutation addTask ($taskName: String!, $startDate: String!, $interval: Int!){
    addTask(taskName: $taskName, startDate: $startDate, interval: $interval) {
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
    name
    id
  }

`

export function TaskDetailsScreen({route, navigation}) {

  const {taskName, id, startDate, interval} = route.params

  const [title, setTitle] = React.useState(taskName === "" ? "New Task Name" : taskName.taskName);
  const [taskId, setTaskId] = React.useState((id === "") ? "" : id.id);
  const [taskStartDate, setTaskStartDate] = React.useState((startDate === "") ? moment() : startDate.startDate);
  const [taskInterval, setTaskInterval] = React.useState((interval === "") ? "7" : interval.interval);

  const [addTask, {load, err, taskData}] = useMutation(ADD_NEW_TASK);
  const [editTask, {loadtask, errtask, editData}] = useMutation(EDIT_TASK); 

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
      editTask({variables: {id: taskId, taskName: title, startDate: taskStartDate, interval: parseInt(taskInterval)}});
    } else {
      addTask({variables: {taskName: title, startDate: taskStartDate, interval: parseInt(taskInterval)}}); 
    }
  };

  return (
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
          onValueChange={(itemValue, itemIndex) => 
            setTaskInterval(itemValue)
          }>
            <Picker.Item label="every day" value="1" />
            <Picker.Item label="every week" value="7" />
            <Picker.Item label="every two weeks" value="14" />
            <Picker.Item label="every month" value="28" />
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
  );
}