
import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet} from "react-native"
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

// const [game, setGame] = useState(false)

export function GameScreen({route, navigation}) {

  const mondaysDate = moment().startOf('isoWeek')
  const sundaysDate = moment().endOf('isoWeek')
  const [listening, setListening] = useState(false)
  const [game, setGame] = useState(false)

  const {loading, error, data: gameData} = useQuery(GET_GAME, {variables: {endDate: sundaysDate}})  
  const [newGame, {loading: newLoading, error: newError, data: newData}] = useMutation(NEW_GAME) 
  const {loading: filterLoading, error: filterError, data: filterData} = useQuery(GET_FILTERED_TASKS, {variables: {mon: mondaysDate, sun: sundaysDate}})
  // console.log("filter data", removeType)
  
  
  useEffect(() => {
    // console.log(game)
    if (gameData && !gameData.getGame && filterData && filterData.getAllTasks && !game) {
      const removeType = filterData.getAllTasks.map((item) => item = {taskName: item.taskName})
      
      if (!game)
      { newGame({variables: {startDate: mondaysDate, endDate: sundaysDate, gameTasks: removeType}})
      .then((newData)=> {
        setGame(newData.data.newGame)
      })}
    }
  }, [listening])
  
  useEffect(() => {
  }, [game])
  
  // console.log(game)
    if (gameData && !listening && filterData) { 
      if (gameData.getGame) {
        setGame(gameData.getGame)
      }
        setListening(true)
    } 

  return (
    <Card containerStyle={{height:"95%"}}>
      <Text style={gameStyles.text}>  </Text>

      <Card.Divider/>
    { game &&
      <View>

      <Text>
        {moment(game.startDate).format('dddd, MMMM Do YYYY')} - {
        moment(game.endDate).format('dddd, MMMM Do YYYY')}
      </Text>
      <Card.Divider/>

      <View style={{
            flexDirection: "row", 
            justifyContent: "center"
          }}> 
          <View style={{
            flexDirection: "row", 
            justifyContent: "space-around"
          }}>
            <Text style={gameStyles.homeTeam}>HOME</Text>
            <Text style={gameStyles.homeScore}>{game.score}</Text>
          </View>
          <Text style={gameStyles.center}> / </Text>
          <View style={{
            flexDirection: "row", 
            justifyContent: "space-around"
          }}>
            <Text style={gameStyles.awayScore}>{game.gameTasks.length-game.score}</Text>
            <Text style={gameStyles.awayTeam}>HOUSE </Text>
          </View>

      </View>


      </View>
   }
      <Card.Divider/>
      

    <Card.Divider/>

    </Card>
  )
}

const gameStyles = StyleSheet.create({
  text: {
    fontSize: 40
  }, 
  homeScore: {
    fontSize: 70, 
    color: "white",
    backgroundColor: "lightgreen",
    padding: 25
  }, 
  awayScore: {
    fontSize: 70, 
    color: "white",
    backgroundColor: "#f5425d", 
    padding: 25,
  }, 
  center: {
    fontSize: 70, 
    color: "black", 
    padding: 1, 
    margin: 1
  }, 
  homeTeam: {
    color: "lightgreen", 
    padding: 20
  }, 
  awayTeam: {
    color: "#f5425d", 
    padding: 20
  }
})