import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
const styles = require('../styles/styles')

export function HomeScreen({navigation, route}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Log Out" />
      )
    })
  }, [navigation])

  return (
    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>

      <TouchableOpacity style={styles.box}
        onPress={() => {
          navigation.navigate('TeamMates')
        }}
      >
        <Text>My TeamMates</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.box}
        onPress={() => {
          navigation.navigate('Tasks')
        }} color="1ACDA5#" > 
            <Text>My Goals</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box}>
        <Text>Game</Text>
      </TouchableOpacity>
      

    </View>
  )
}
