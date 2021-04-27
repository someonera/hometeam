import React, { useEffect, useState }from 'react'
import {Text, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import moment from 'moment'

export default function CheckBoxComponent (props) {

  const {done, taskName, checkUncheck, refetch} = props

  const endOfWeek = moment().endOf('isoWeek')

  useEffect(() => {
    refetch()
  }, [done])

  const [firstTime, setFirstTime] = React.useState(true)
  const [checkState, setCheckState] = React.useState(done)
  
  const tick = () => {
    checkUncheck({variables: {taskName: taskName, endDate: endOfWeek}})
    // setCheckState(!checkState)
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
