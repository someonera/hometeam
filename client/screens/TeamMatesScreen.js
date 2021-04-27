

import React, { useEffect, useState, useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
const styles = require("../styles/styles");
import { gql, useQuery } from "@apollo/client";
import {Button , Card, FAB} from "react-native-elements";
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch(); 
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const { loading, error, data, refetch} = useQuery(GET_ALL_USERS);
  if (loading) return <Text> 'Loading...';</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;


  return (

    <View>
    <ScrollView>
      
    

      {data.getAllUsers.map(({name, id, tasks}) => (
      <Card key={id}>
          {/* <Icon name="smile" size={30} color="lightgreen" /> */}
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
          
          <Text> {name}'s Skills: </Text>
          {tasks.map(({taskName}) => (
            <Text key = {taskName}> {taskName} </Text>
          ))}
        
        <View style={{position:"relative", alignItems:"center"}}> 
        </View>

      </Card>
      ))}
    </ScrollView>

    <FAB
        style={styles.fab}
        icon={<Icon name="plus" size={20} color="white"/>}
        title = "ADD NEW"
        onPress={() => {
          navigation.navigate("AddTeamMate");
        }}
      />

    </View>
  );
}