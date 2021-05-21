import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { ListItem } from "react-native-elements";
const styles = require("../styles/styles");
import Icon from "react-native-vector-icons/Feather";

const GET_PAST_GAMES = gql`
  query getAllPastGames($endDate: String!) {
    getAllPastGames(endDate: $endDate) {
      score
      gameTasks {
        taskName
      }
      startDate
      endDate
    }
  }
`;

export function StatsScreen({ route, navigation }) {
  const [goodIcon, setGoodIcon] = useState("");
  const [badIcon, setBadIcon] = useState("");

  const sundaysDate = moment().endOf("isoWeek");
  const { loading, error, data } = useQuery(GET_PAST_GAMES, {
    variables: { endDate: sundaysDate },
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <ScrollView>
      {data.getAllPastGames.map(({ score, gameTasks, endDate, startDate }) => (
        <ListItem key={score}>
          <Icon
            name={gameTasks.length - score < score ? "award" : "meh"}
            size={50}
            color={gameTasks.length - score < score ? "gold" : "red"}
          />
          <ListItem.Content>
            <Text style={styles.listItem}>
              {moment(startDate).format("MMMM Do")} -{" "}
              {moment(endDate).format("MMMM Do")}{" "}
            </Text>
            <Text style={{ fontSize: 25, color: "green" }}>
              Home {score} : {gameTasks.length - score} Away
            </Text>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
}
