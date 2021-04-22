import React, { useReducer } from 'react';
import { Text, View , TouchableOpacity} from 'react-native';
const styles = require('../styles/styles')
import { gql, useQuery } from '@apollo/client'


const GET_ALL_TASKS = gql`
  query getAllTasks {
    getAllTasks {
      taskName

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

      {data.getAllTasks.map(({taskName}) => (
        <TouchableOpacity key={taskName}
        onPress={() => {
          navigation.navigate('TaskDetails')
        }}
        >
          <Text>
          Goal: {taskName}
          </Text>
        </TouchableOpacity>
      ))}
      
    </View>
  )
  
}


