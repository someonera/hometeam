
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
    }
  }
`

export function GameScreen({route, navigation}) {

  const mondaysDate = moment().startOf('isoWeek')
  const sundaysDate = moment().endOf('isoWeek')

  const [game, setGame] = React.useState(false) 
  const {loading, error, data: gameData} = useQuery(GET_GAME, {variables: {endDate: "something"}})  
  const [newGame, {loading: newLoading, error: newError, data: newData}] = useMutation(NEW_GAME) 

  useEffect(() => {
    
  }, [])
  
  
  if (loading) return <Text>Loading</Text>
  if (error) return  <Text>Error</Text>
  
  if (newLoading) return <Text>Loading</Text>
  if (newError) return <Text>Error</Text>
  
  if (gameData.getGame === null && !game) {
    const new_game = newGame({variables: {startDate: sundaysDate, endDate: sundaysDate}})
    console.log(new_game)
    if (new_game) {
      setGame(newData.newGame) 
      console.log("hellothere")
    } 
  } else if (!game) {
    setGame(gameData.getGame)
  }
  

  console.log("gameData:", gameData)
  console.log("game:", game)
  console.log("game", game)
  console.log("new data", newData)
  console.log("gameData", gameData)

  return (
    <Card containerStyle={{height:"95%"}}>
      <Text> this is the game screen </Text>

    </Card>
  )
}