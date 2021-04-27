import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight } from "react-native";
const styles = require("../styles/styles");
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

export function HomeScreen({navigation, route}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Log Out" />
      )
    });
  }, [navigation]);

  return (
    <View>
      <ListItem
          Component={TouchableHighlight}
          onPress={() => {
          navigation.navigate("TeamMates");
        }}
      >
        <Icon name="user" size={50} color="lightgreen"/>

        <ListItem.Content>
          <ListItem.Title>
            TeamMates
          </ListItem.Title>
          <ListItem.Subtitle>
            See and Edit Your TeamMates
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>


      <ListItem
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("TasksTabs");
        }} color="1ACDA5#" > 
        <Icon name="dribbble" size={50} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title>
            Our Goals
          </ListItem.Title>

          <ListItem.Subtitle>
            Add and Edit Your Team Goals
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <ListItem
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("This Week's Match")
        }}
      >
      <Icon name="eye" size={50} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title>
            This Week's Match
          </ListItem.Title>
          <ListItem.Subtitle>
            This Week's Match
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>


      <ListItem
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("Stats")
        }}
      >
      <Icon name="eye" size={50} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title>
            Stats!
          </ListItem.Title>
          <ListItem.Subtitle>
            See Past Stats
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>

      <ListItem
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("GotTheBall")
        }}
      >

      <Icon name="dribbble" size={50} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title>
            I've Got The Ball
          </ListItem.Title>
          <ListItem.Subtitle>
             My Tasks This Week
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>

    </View>
  );
}
