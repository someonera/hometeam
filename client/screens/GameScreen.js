
import React, {useState, useEffect} from "react";
import { Text, View } from "react-native"
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'
import {Card } from 'react-native-elements'
import GameTaskComponent from '../components/GameTaskComponent'

const NEW_GAME = gql`
  mutation newGame($startDate: String!, $endDate: String!, $gameTasks: [TaskInput]) {
    newGame(startDate: $startDate, endDate: $endDate, gameTasks: $gameTasks) {
      startDate
      endDate
      score
      gameTasks {
        taskName
      }
    }
  }
`
const GET_GAME = gql`
  query getGame($endDate: String!) {
    getGame(endDate: $endDate) {
      gameTasks {
        taskName
        taskWho
        
      }
      id
      startDate
      endDate
      score

    }
  }
`

const GET_FILTERED_TASKS = gql`
  query getAllTasks($mon: String, $sun: String) {
    getAllTasks(mon: $mon, sun: $sun) {
      taskName
      taskWho
    }
  }
`


export function GameScreen({route, navigation}) {

  const mondaysDate = moment().startOf('isoWeek')
  const sundaysDate = moment().endOf('isoWeek')
  const [game, setGame] = useState(false)
  const [listening, setListening] = useState(false)

  const {loading, error, data: gameData} = useQuery(GET_GAME, {variables: {endDate: sundaysDate}})  
  const [newGame, {loading: newLoading, error: newError, data: newData}] = useMutation(NEW_GAME) 
  const {loading: filterLoading, error: filterError, data: filterData} = useQuery(GET_FILTERED_TASKS, {variables: {mon: mondaysDate, sun: sundaysDate}})
  // console.log("filter data", removeType)
  
  if (gameData && !listening) { 
    console.log("gameData HERE", gameData)
    setGame(gameData.getGame)
    setListening(true)
  } 
  
  useEffect(() => {
    if (gameData && !gameData.getGame && filterData && filterData.getAllTasks) {
      const removeType = filterData.getAllTasks.map((item) => item = {taskName: item.taskName, taskWho: item.taskWho})
      newGame({variables: {startDate: mondaysDate, endDate: sundaysDate, gameTasks: removeType}})
      .then((newData)=> {
        console.log("this is new:", newData)
        setGame(newData.newGame)
      })
    }
  }, [listening])

  console.log(game)

  return (
    <Card containerStyle={{height:"95%"}}>
      <Text> Home VS House </Text>

      <Card.Divider/>
    
      <Text>
        {moment(game.startDate).format('dddd, MMMM Do YYYY')}
        </Text>
      <Card.Divider/>
      <Text>
        {moment(game.endDate).format('dddd, MMMM Do YYYY')}
      </Text>
      <Card.Divider/>
      <Text>
        score: {game.score}
      </Text>

      <Card.Divider/>
      
      {/* HOW DO I DO THIS?? */}
      {/* this doesn't work when the game renders for the first time */}
      {/* {game.gameTasks.map(({taskName, taskWho}) => (
        <Text key={taskName}>{taskName} - {taskWho} </Text>
        ) 
      )} */}

      {/* <GameTaskComponent game={game}></GameTaskComponent> */}

    <Card.Divider/>

    </Card>
  )
}