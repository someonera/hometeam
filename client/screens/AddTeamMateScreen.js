import React, { useReducer, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
const styles = require("../styles/styles");
import { gql, useMutation } from "@apollo/client";
import { Button, Card } from "react-native-elements";

const ADD_NEW_USER = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

export function AddTeamMateScreen({ route, navigation }) {
  const [input, setInput] = useState("");
  const [addUser, { loading, error, data }] = useMutation(ADD_NEW_USER);

  const submit = (e) => {
    e.preventDefault();
    addUser({ variables: { name: input } });
    navigation.navigate("TeamMates");
  };

  return (
    <Card containerStyle={{ height: "95%" }}>
      <Text style={styles.listItem}>Add New Team Mate: </Text>
      <View style={{ height: 40 }}></View>

      <SafeAreaView>
        <TextInput
          editable={true}
          style={{ fontSize: 50, borderColor: "lightgreen", borderWidth: 1 }}
          value={input}
          onChangeText={setInput}
        />
      </SafeAreaView>
      <View style={{ height: 50 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button title={"Add"} onPress={submit}></Button>
        <Button
          title={"Discard Changes"}
          onPress={() => navigation.navigate("TeamMates")}
        ></Button>
      </View>
    </Card>
  );
}
