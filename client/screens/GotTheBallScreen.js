import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import {Card, CheckBox, ListItem} from 'react-native-elements'
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

export function GotTheBallScreen({route, navigation}) {

const endOfWeek = moment().endOf('isoWeek')
  
const [checkUncheck, {loading: checkLoading, error: checkError, data: checkData}] = useMutation(CHECK_UNCHECK)
const {loading, error, data, refetch} = useQuery(GET_GAME_WITH_FILTERED_TASKS, {variables: {endDate: endOfWeek}}) 


if (checkLoading) return <Text>  </Text>
if (checkError) return <Text>{checkError}</Text>

if (loading) return <Text>  </Text>
if (error) return <Text>{error}</Text>

const thisUser = "Amalia"
const tasksFilteredByName = data.getGame.gameTasks.filter(item => item.taskWho === thisUser)


return (
    <Card>

      <Text>You've got the Ball! </Text>

{ tasksFilteredByName &&
  
    <View>  
    <Text>{thisUser} Has {tasksFilteredByName.length} Shots This Week: </Text>

      { tasksFilteredByName.map(({taskName, done}) => (
  
        <ListItem key={taskName}>
        <Text>{taskName}</Text>

        {/* <CheckBox checked={thing}
          checkedTitle="Score!"
          onPress={() => {
            checkUncheck({variables: {taskName: taskName, endDate: endOfWeek}})
            setThing(done)
          }}
        /> */}
        <CheckBoxComponent taskName={taskName} done={done} checkUncheck={checkUncheck}
        refetch={refetch}
        />


        </ListItem>
      ))

      }
  
    </View>     
} 

    </Card>
  )
}