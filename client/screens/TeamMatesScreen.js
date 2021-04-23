

import React, { useEffect, useState, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
const styles = require('../styles/styles')
import { gql, useQuery } from '@apollo/client'
import {Button , Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'


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
`

export function TeamMatesScreen({routes, navigation}) {
  const { loading, error, data } = useQuery(GET_ALL_USERS)
  if (loading) return <Text> 'Loading...';</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>
  return (
    <ScrollView>
      <Button
        icon={<Icon name="plus"/>}
        title = "New TeamMate"
        onPress={() => {
          navigation.navigate('AddTeamMate')
        }}
      >
        <Text>Add A New Team Mate</Text>
      </Button>

      <Text> Hello and Welcome </Text>
      {data.getAllUsers.map(({name, id}) => (
      
      <Card key={id}>
        <Card.Title>{name}</Card.Title>
        <Card.Divider/>
        
        <View style={{position:'relative', alignItems:"center"}}> 
          <Icon name="smile" size={30}/>
          <Text>All Time Goals: </Text>
          <Text>MVP Awards: </Text>

        </View>
      </Card>
      ))}
    </ScrollView>
  )
}