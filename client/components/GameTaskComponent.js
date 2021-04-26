import React from 'react'
import {Text, View} from 'react-native'

export default function GameTaskComponent (props) {

  const {gameTasks} = props

  return (
    
    <View>

    {gameTasks.map(({taskName, taskWho}) => (
      <Text key={taskName}> {taskName}, {taskWho}</Text>
    ))}

    </View>

)

}