import React, { useReducer , useEffect, useState} from "react";
import { ScrollView, Text, View , TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { gql, useQuery } from "@apollo/client";
import { FAB, Button, Card, Switch } from "react-native-elements";

const styles = require("../styles/styles");

export const GET_ALL_TASKS = gql`
  query getAllTasks {
    getAllTasks {
      taskName
      id
      startDate
      interval
      taskWho
    }
  }
`;

export function TasksScreen ({route, navigation}) {
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch(); 
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);
  
  
  const { loading, error, data , refetch } = useQuery(GET_ALL_TASKS);
  if (loading) return <Text> 'Loading...';</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
    
  return (
    <ScrollView>

    { data &&
      <View>

      {data.getAllTasks.map(({taskName, id, interval, startDate, taskWho}) => (
        <Card key={id}> 

          <Card.Title>
          Goal: {taskName}
          </Card.Title>
          <Text> every {interval} days</Text>
          <Text> done by: {taskWho} </Text>

        <Button key={id}
        icon={<Icon name="edit-2"/>}
        onPress={() => {
          navigation.navigate("TaskDetails", {
            taskName: {taskName}, 
            id: {id}, 
            interval: {interval}, 
            startDate: {startDate}, 
            taskWho: {taskWho}
          });
        }}
        />
    
        </Card>
      ))}

      </View>
}
      <FAB
        icon ={<Icon name="plus"/>}
        onPress={() => {
          navigation.navigate("TaskDetails", {
            taskName: "", 
            id: "",
            interval: "", 
            startDate: "", 
            taskWho: ""
          });
        }}
      />

    </ScrollView>
  );
  
}


