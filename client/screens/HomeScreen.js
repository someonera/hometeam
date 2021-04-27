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
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("This Week's Match")
        }}
      >
      <Icon name="calendar" size={80} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title style={styles.listItem}>
            Match of The Week
          </ListItem.Title>
          <ListItem.Subtitle>
            This Week's Match
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>



      <ListItem
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("GotTheBall")
        }}
      >

      <Icon name="dribbble" size={80} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title style={styles.listItem}>
            You've Got The Ball!
          </ListItem.Title>
          <ListItem.Subtitle>
             Your Tasks This Week
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>
      <ListItem
          Component={TouchableOpacity}
          onPress={() => {
          navigation.navigate("TeamMates");
        }}
      >
        <Icon name="user" size={80} color="lightgreen"/>

        <ListItem.Content>
          <ListItem.Title style={styles.listItem}>
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
        <Icon name="check-circle" size={80} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title style={styles.listItem}>
            Our Goals
          </ListItem.Title>

          <ListItem.Subtitle>
            Add and Schedule Goals
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>


      <ListItem
        Component={TouchableOpacity}
        onPress={() => {
          navigation.navigate("Stats")
        }}
      >
      <Icon name="award" size={80} color="lightgreen"/>
        <ListItem.Content>
          <ListItem.Title style={styles.listItem}>
            Past Matches
          </ListItem.Title>
          <ListItem.Subtitle>
            See Your Team History
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>

    </View>
  );
}
