import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  box: {
    width: 100,
    height:100,
    padding: 25,
    backgroundColor: "#57BF08",
    margin: 5,
  },
  input: {
    fontSize: 40, 
    
  },
  picker: {
    fontSize:20,
    width: "40%"
  }, 
  textInput: {
    fontSize: 50
  }, 
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 0,
    right: 0
  }, 

  thingButton: {
    position: 'relative', 
    bottom: 5  
  }



});

module.exports = styles; 

