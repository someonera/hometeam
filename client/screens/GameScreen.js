
import React, {useState, useEffect} from "react";
import { Text, View } from "react-native"
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'
import {Card } from 'react-native-elements'

const NEW_GAME = gql`
  mutation newGame($startDate: String!, $endDate: String!) {
    newGame(startDate: $startDate, endDate: $endDate) {
      startDate
      endDate
      score
    }
  }
`
const GET_GAME = gql`
  query getGame($endDate: String!) {
    getGame(endDate: $endDate) {
      id
      startDate
      endDate
      score

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

  if (gameData && !listening) { 
    console.log("gameData HERE", gameData)
    setGame(gameData.getGame)
    setListening(true)
  } 
  
  useEffect(() => {
    if (gameData && !gameData.getGame) {
      newGame({variables: {startDate: mondaysDate, endDate: sundaysDate}})
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

      <Text>
        {game.startDate}
        {game.endDate}
        score: {game.score}
      </Text>
    </Card>
  )
}