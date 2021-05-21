import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Card, CheckBox, ListItem } from "react-native-elements";
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import CheckBoxComponent from "../components/CheckBoxComponent";
const styles = require("../styles/styles");
import { Picker } from "@react-native-picker/picker";

// const ALL_TASKS_BY_NAME = gql`
//   query getAllTasks ($mon: String, $sun: String, $taskWho: String) {
//     getAllTasks (mon: $mon, sun: $sun, taskWho: $taskWho) {
//       taskName
//       taskWho
//       done
//     }
//   }
// `

const GET_GAME_WITH_FILTERED_TASKS = gql`
  query getGame($endDate: String!) {
    getGame(endDate: $endDate) {
      gameTasks {
        taskName
        taskWho
        done
      }
      startDate
      endDate
    }
  }
`;

const CHECK_UNCHECK = gql`
  mutation checkTask($taskName: String!, $endDate: String!) {
    checkTask(taskName: $taskName, endDate: $endDate)
  }
`;

export function GotTheBallScreen({ route, navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const endOfWeek = moment().endOf("isoWeek");
  const [tasks, setTasks] = useState([]);
  // const [thisUser, setThisUser] = useState("")
  const [
    checkUncheck,
    { loading: checkLoading, error: checkError, data: checkData },
  ] = useMutation(CHECK_UNCHECK);
  const { loading, error, data, refetch } = useQuery(
    GET_GAME_WITH_FILTERED_TASKS,
    {
      variables: { endDate: endOfWeek },
    }
  );

  useEffect(() => {
    if (data) {
      setTasks(
        data.getGame.gameTasks.filter((item) => item.taskWho === thisUser)
      );
    }
  }, [data]);

  const toggleCheck = async (mutationArgs) => {
    await checkUncheck(mutationArgs);
    setTasks((previousTasks) => {
      const newTasks = previousTasks.map((task) => {
        if (task.taskName === mutationArgs.variables.taskName) {
          return { ...task, done: !task.done };
        } else {
          return task;
        }
      });
      return newTasks;
    });
  };

  if (checkLoading) return <Text> </Text>;
  if (checkError) return <Text>{checkError}</Text>;

  if (loading) return <Text> </Text>;
  if (error) return <Text>{error}</Text>;

  const thisUser = "Little Kid";

  return (
    <Card>
      {/* <Picker
  style={styles.picker}
  itemStyle={{height: 110}}
  selectedValue={thisUser}
  onValueChange={(itemValue) => {
    setThisUser(itemValue)
    refetch()
    // toggleCheck()
  }
  }
>
  <Picker.Item label="Little Kid" value="Little Kid"/>
  <Picker.Item label="Big Kid" value="Big Kid"/>
  <Picker.Item label="Parent" value="Parent"/>

  </Picker> */}

      {tasks && (
        <View>
          <Text style={styles.listItem}>
            Hey {thisUser}! You have {tasks.length} Goals This Week:{" "}
          </Text>

          {tasks.map(({ taskName, done }) => (
            <ListItem key={taskName}>
              <CheckBoxComponent
                taskName={taskName}
                done={done}
                toggleCheck={toggleCheck}
              />

              <Text style={styles.listItem}>{taskName}</Text>
            </ListItem>
          ))}
        </View>
      )}
    </Card>
  );
}
