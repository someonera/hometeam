
import {TouchableHighlight} from "react-native";

export const theme = {
  colors: {
    primary: "lightgreen", 
    secondary: "#f5425d"
  }, 
  CheckBox: {
    checkedColor: "#f5425d", 
    size: 50
  },


  Button: {
    raised: false,
    buttonStyle: {
      width: 150, 
      // margin: 5, 
      // padding: 10
    },
    containerStyle: {
      // margin: 2
    }, 
    titleStyle: {
      fontSize: 15,
      fontWeight: "bold"
    }
  },

  Header: {
    headerStyle: {
      backgroundColor: "pink"
    }
  }, 

  ListItem: {
    containerStyle:{
      margin: 10,
      borderRadius: 10, 
      fontSize: 40
    }, 
    
  }, 

  Card: {
    containerStyle: {
      margin: 10, 
      borderRadius: 10,
     
    }, 
    title: {
      fontSize: 40
    }
  }, 




};