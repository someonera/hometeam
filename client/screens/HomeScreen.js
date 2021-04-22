import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';


export function HomeScreen({navigation, route}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="Log Out" />
      )
    })
  }, [navigation])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Let's play!"
        onPress={() => {
          navigation.navigate('Tasks')
        }} color="#1ACDA5" />


    </View>
  )
}
