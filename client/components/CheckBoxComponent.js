import React, { useEffect, useState }from 'react'
import {Text, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import moment from 'moment'

export default function CheckBoxComponent (props) {

  const {done, taskName, toggleCheck} = props

  const endOfWeek = moment().endOf('isoWeek')

  
  const tick = () => {
    toggleCheck({variables: {taskName: taskName, endDate: endOfWeek}})
  }

  return (

    <View>
      <CheckBox checked={done}
          checkedTitle="Score!"
          onIconPress={tick}
      />

    </View>

)

}
