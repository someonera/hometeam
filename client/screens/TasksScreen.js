import React, { useReducer } from "react";
import { Text, View , TouchableOpacity} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { gql, useQuery } from "@apollo/client";
import { Button, Card } from "react-native-elements";

const styles = require("../styles/styles");

const GET_ALL_TASKS = gql`
  query getAllTasks {
    getAllTasks {
      taskName
      id
    }
  }
`;


export function TasksScreen({route, navigation}) {
  const { loading, error, data } = useQuery(GET_ALL_TASKS);
  if (loading) return <Text> 'Loading...';</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <View>

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
          });
        }}
        />
    
    
        </Card>
      ))}

      <Button title={"Add New Task"} 
        icon ={<Icon name="plus"/>}
        onPress={() => {
          navigation.navigate("TaskDetails", {
            taskName: "USER_ENTERING_NEW_TASK"
          });
        }}
      ></Button>

    </View>
  );
  
}


