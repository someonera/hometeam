import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import {Card, CheckBox} from 'react-native-elements'
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'



const ALL_TASKS_BY_NAME = gql`
  query getAllTasks ($mon: String, $sun: String, $taskWho: String) {
    getAllTasks (mon: $mon, sun: $sun, taskWho: $taskWho) {
      taskName
      taskWho
      done
    }
  }
`

// do a query on the CURRENT GAME to show ALL THE TASKS for this week 
// WHERE I AM THE TASKWHO PERSON. 

// ALLOW ME TO TOGGLE THE TASK IN AND OUT OF THE DONE TASKS ARRAY 
// OF THE GAME. 

// I THINK ALL ITEMS IN THE GAME ARRAY CAN HAVE A DONE BOOLEAN. 
// which you can manipulate here. 

export function GotTheBallScreen({route, navigation}) {

const {loading, error, data} = useQuery(ALL_TASKS_BY_NAME, {variables: {
  mon: moment().startOf('isoWeek'), 
  sun: moment().endOf('isoWeek'), 
  taskWho: "Rosie"
}})

  console.log(data)
return (
    <Card>

      
      <Text>I've got the Ball! </Text>
      {data.getAllTasks.map(({done, taskName}) => (

        <View flexDirection={"row"}>
        <Text>{taskName}</Text>
        <CheckBox></CheckBox>
        </View>
      ))}
      
  


    </Card>
  )
}