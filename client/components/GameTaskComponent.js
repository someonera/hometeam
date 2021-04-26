import React, { useEffect }from 'react'
import {Text, View} from 'react-native'

export default function GameTaskComponent (props) {

  const {game} = props
  console.log(game)

  useEffect(() => {
    

  }, [game])

  return (
    
    <View>

    {gameTasks.map(({taskName, taskWho}) => (
      <Text key={taskName}> {taskName}, {taskWho}</Text>
    ))}

    </View>

)

}