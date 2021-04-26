import React, {useState, useEffect} from 'react'
import {Text, View} from 'react-native'
import {Card} from 'react-native-elements'
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'

// const GET_MY_TASKS_FOR_THIS_WEEK = gql`
  

// `

// do a query on the current GAME to show ALL THE TASKS for this week 
// WHERE I AM THE TASKWHO PERSON. 

// ALLOW ME TO TOGGLE THE TASK IN AND OUT OF THE DONE TASKS ARRAY 
// OF THE GAME. 

// I THINK ALL ITEMS IN THE GAME ARRAY CAN HAVE A DONE BOOLEAN. 
// which you can manipulate here. 

export function GotTheBallScreen({route, navigation}) {

  // console.log(data.getUser)

  
return (
    <Card>

        <Text>I've got the Ball! </Text>

    </Card>
  )
}