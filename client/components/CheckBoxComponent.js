import React, { useEffect, useState }from 'react'
import {Text, View} from 'react-native'
import {CheckBox} from 'react-native-elements'
import moment from 'moment'

export default function CheckBoxComponent (props) {

  const {done, taskName, checkUncheck} = props
  console.log("done", done)

  const endOfWeek = moment().endOf('isoWeek')

  
  useEffect(() => {
    setCheckState(done)
    console.log("hello")
  }, [])
  const [checkState, setCheckState] = React.useState()
  
  const tick = () => {
    // setCheckState(!checkState)
    checkUncheck({variables: {taskName: taskName, endDate: endOfWeek}}).then(result => setCheckState(result))
    // console.log("bool", bool)
    // setCheckState(bool)
  }

  return (
    
    <View>
      <CheckBox checked={checkState} title={taskName}
          checkedTitle="Score!"
          onIconPress={tick}
      />

    </View>

)

}
