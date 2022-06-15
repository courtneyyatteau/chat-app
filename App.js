import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Chat from "./components/Chat";
import Start from "./components/Start";
// import react native gesture handler
import "react-native-gesture-handler";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          initialRouteName="Start"
          screenOptions={{
            headerStyle: { backgroundColor: "papayawhip", height: 60 },
          }}
        >
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat}/>
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
