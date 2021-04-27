import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import {Card} from 'react-native-elements'
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'

const GET_MY_TASKS_FOR_THIS_WEEK = gql`
  query getGame($endDate: String!) {
    getGame(endDate: $endDate) {
      startDate
      gameTasks {
        taskName
        taskWho
        done
      }
    }
  }
`

const FILTER_BY_NAME = gql`
  query getAllTasks($name: String) {
    getAllTasks(name: $name) {
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

const {loading, error, data} = useQuery(GET_MY_TASKS_FOR_THIS_WEEK, {variables: {endDate: moment().endOf('isoWeek')}})
const {loading: nameFilterLoading, 
        error: nameFilterError, 
        data: nameFilterData} = useQuery(FILTER_BY_NAME, {variables: {name: "Rosie"}})
  console.log(data)

  console.log(nameFilterData)
return (
    <Card>

        <Text>I've got the Ball! </Text>

    </Card>
  )
}