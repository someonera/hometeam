import React, { useReducer , useEffect, useState} from "react";
import { ScrollView, Text, View , TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { gql, useQuery } from "@apollo/client";
import { Button, Card } from "react-native-elements";

const styles = require("../styles/styles");

export const GET_ALL_TASKS = gql`
  query getAllTasks {
    getAllTasks {
      taskName
      id
    }
  }
`;

export function TasksScreen ({route, navigation}) {
  const { loading, error, data , refetch } = useQuery(GET_ALL_TASKS);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch(); 
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);


    if (loading) return <Text> 'Loading...';</Text>;
    if (error) return <Text>`Error! ${error.message}`</Text>;
    
  return (
    <ScrollView>

      {data.getAllTasks.map(({taskName, id}) => (
        <Card key={id}> 

          <Card.Title>
          Goal: {taskName}
          </Card.Title>

        <Button key={id}
        icon={<Icon name="edit-2"/>}
        onPress={() => {
          navigation.navigate("TaskDetails", {
            taskName: {taskName}, 
            id: {id}, 
          });
        }}
        />
    
    
        </Card>
      ))}

      <Button title={"Add New Task"} 
        icon ={<Icon name="plus"/>}
        onPress={() => {
          navigation.navigate("TaskDetails", {
            taskName: "USER_ENTERING_NEW_TASK", 
            id: "USER_ENTERING_NEW_TASK"
          });
        }}
      ></Button>

    </ScrollView>
  );
  
}


