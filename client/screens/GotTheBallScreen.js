import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import {Card, CheckBox} from 'react-native-elements'
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'
import CheckBoxComponent from '../components/CheckBoxComponent'


// const ALL_TASKS_BY_NAME = gql`
//   query getAllTasks ($mon: String, $sun: String, $taskWho: String) {
//     getAllTasks (mon: $mon, sun: $sun, taskWho: $taskWho) {
//       taskName
//       taskWho
//       done
//     }
//   }
// `

const GET_GAME_WITH_FILTERED_TASKS=gql`
  query getGame($endDate: String!) {
    getGame(endDate: $endDate) {
      gameTasks {
        taskName
        taskWho
        done
        }
    startDate
    endDate
    }
  }
`

const CHECK_UNCHECK = gql`
  mutation checkTask($taskName: String!, $endDate: String!) {
    checkTask(taskName: $taskName, endDate: $endDate) 
  }

`

// do a query on the CURRENT GAME to show ALL THE TASKS for this week 
// WHERE I AM THE TASKWHO PERSON. 

// ALLOW ME TO TOGGLE THE TASK IN AND OUT OF THE DONE TASKS ARRAY 
// OF THE GAME. 

// I THINK ALL ITEMS IN THE GAME ARRAY CAN HAVE A DONE BOOLEAN. 
// which you can manipulate here. 

export function GotTheBallScreen({route, navigation}) {
  

  const endOfWeek = moment().endOf('isoWeek')
  const {loading, error, data} = useQuery(GET_GAME_WITH_FILTERED_TASKS, {variables: {endDate: endOfWeek
  }}) 
  
const [checkUncheck, {loading: checkLoading, error: checkError, data: checkData}] = useMutation(CHECK_UNCHECK)

if (checkLoading) return <Text>"loading"</Text>
if (checkError) return <Text>{checkError}</Text>

if (loading) return <Text>"loading"</Text>
if (error) return <Text>{error}</Text>

const thisUser = "Amalia"

const tasksFilteredByName = data.getGame.gameTasks.filter(item => item.taskWho === thisUser)


return (
    <Card>

      <Text>You've got the Ball! </Text>
      <Text>{thisUser} Has {tasksFilteredByName.length} Shots This Week: </Text>

{ tasksFilteredByName &&
    <View>  
      { tasksFilteredByName.map(({taskName, done}) => (
        <View key={taskName}>
      
        <CheckBoxComponent key={taskName} done={done} taskName={taskName} checkUncheck={checkUncheck}/>



        </View>
      ))

      }
  
    </View>     
} 

    </Card>
  )
}