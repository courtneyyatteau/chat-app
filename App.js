import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Chat from "./components/Chat";
import Start from "./components/Start";
import CustomActions from "./CustomActions";
// import react native gesture handler
import "react-native-gesture-handler";
import { LogBox } from "react-native";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerStyle: { backgroundColor: "papayawhip", height: 90 },
          }}
        >
          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
