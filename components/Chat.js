import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Pressable,
  Image,
} from "react-native";

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      textColor: "white",
    };
  }
  componentDidMount() {
    let { bckClr } = this.props.route.params;
    if (bckClr === "white") {
      this.setState({ textColor: "black" });
    }
  }
  render() {
    let { bckClr } = this.props.route.params;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bckClr,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: this.state.textColor, fontSize: 18 }}>CHAT</Text>
      </View>
    );
  }
}
