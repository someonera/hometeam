import React, { useReducer } from 'react';
import { Text, View , TouchableOpacity} from 'react-native';


import { gql, useQuery } from '@apollo/client'
import { Button } from 'react-native-elements'

const styles = require('../styles/styles')
const {buttonStyle, containerStyle}= require('../styles/buttonStyles')

const GET_ALL_TASKS = gql`
  query getAllTasks {
    getAllTasks {
      taskName
      id
    }
  }
`


export function TasksScreen({route, navigation}) {
  const { loading, error, data } = useQuery(GET_ALL_TASKS)
  console.log(data)
  if (loading) return <Text> 'Loading...';</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  return (
    <View>

      {data.getAllTasks.map(({taskName, id}) => (
        <View> 

          <Text>
          Goal: {taskName}
          </Text>

        <Button buttonStyle={buttonStyle} key={id}
        onPress={() => {
          navigation.navigate('TaskDetails')
        }}
        >
          <Text> Edit </Text>
        </Button>

        </View>
      ))}
      
    </View>
  )
  
}


