

import React, { useEffect, useState, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
const styles = require("../styles/styles");
import { gql, useQuery } from "@apollo/client";
import {Button , Card} from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";


const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      name
      id
      tasks {
        taskName
      }
      
    }
  }
`;

export function TeamMatesScreen({routes, navigation}) {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  if (loading) return <Text> 'Loading...';</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;
  return (
    <ScrollView>
      <Button
        buttonStyle={{width: 150}}
        icon={<Icon name="plus"/>}
        title = "  New TeamMate"
        onPress={() => {
          navigation.navigate("AddTeamMate");
        }}
      />
    

      {data.getAllUsers.map(({name, id, tasks}) => (
      
      <Card key={id}>
        <Card.Title>
          {name} 
        <Button 
            buttonStyle={{marginLeft: 150}}
            icon={<Icon name="edit-2"/>}
            onPress={() => {
              navigation.navigate("UserDetails", {
                name: {name}, 
              });
            }}
          />
        </Card.Title>
  
        <Card.Divider/>
        
        <View style={{position:"relative", alignItems:"center"}}> 
          <Icon name="smile" size={30}/>
          <Text>All Time Goals: </Text>
          <Text>MVP Awards: </Text>
        </View>

        {/* {tasks.map((task) => {
          <Text key={task._id}> Current Tasks: {task.taskName}</Text>
        })} */}
      </Card>
      ))}
    </ScrollView>
  );
}