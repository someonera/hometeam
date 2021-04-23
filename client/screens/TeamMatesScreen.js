

import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
const styles = require('../styles/styles')
import { gql, useQuery } from '@apollo/client'


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
    <View>
      <TouchableOpacity style={styles.box}
        onPress={() => {
          navigation.navigate('AddTeamMate')
        }}
      >
        <Text>Add A New Team Mate</Text>
      </TouchableOpacity>

      <Text> Hello and Welcome </Text>
      {data.getAllUsers.map(({name, id}) => (
      
      <Text key={id}>
        name: {name}
      </Text>
      ))}
    </View>
  )
}