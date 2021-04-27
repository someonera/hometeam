
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
        taskWho
        done
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

    { game &&
      <View>
        <View style={{
            flexDirection: "row", 
            justifyContent: "center"
          }}>
        <Text style={{
          padding: 14, 
          fontSize: 20
        }}>
        {moment(game.startDate).format('dddd, MMMM Do')} - {
        moment(game.endDate).format('dddd, MMMM Do')}
        </Text>
        </View>



      <View style={{
            flexDirection: "row", 
            alignItems: "center",
            justifyContent: "center"
          }}> 
          <View style={{
            flexDirection: "column", 
            justifyContent: "space-around"
          }}>
            <Text style={gameStyles.homeTeam}>HOME</Text>
            <Text style={gameStyles.homeScore}>{game.score}</Text>
          </View>
          <Text style={gameStyles.center}> : </Text>
          <View style={{
            flexDirection: "column", 
            justifyContent: "space-around"
          }}>
            <Text style={gameStyles.awayScore}>{game.gameTasks.length-game.score}</Text>

            <Text style={gameStyles.awayTeam}>AWAY</Text>

          </View>

        </View>


      </View>

   }

    </Card>
  )
}

const gameStyles = StyleSheet.create({
  text: {
    fontSize: 40
  }, 
  homeScore: {
    fontSize: 100, 
    color: "white",
    backgroundColor: "lightgreen",
    padding: 25
  }, 
  awayScore: {
    fontSize: 100, 
    color: "white",
    backgroundColor: "#f5425d", 
    padding: 25,
  }, 
  center: {
    fontSize: 100, 
    color: "black", 
    padding: 1, 
    margin: 1, 
    color: "grey"
  }, 
  homeTeam: {
    color: "lightgreen", 
    padding: 10, 
    fontSize:30,
    fontWeight: "bold"
  }, 
  awayTeam: {
    color: "#f5425d", 
    padding: 10,
    fontSize: 30, 
    fontWeight: "bold", 
  }
})