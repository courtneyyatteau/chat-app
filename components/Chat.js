import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";

import BackgroundImage from "../assets/BackgroundImage.png";

export default class Start extends Component {
  render() {
    let { bckClr } = this.props.route.params;
    return (
      <View style={{ flex: 1, backgroundColor: bckClr }}>
        <Text>TEST</Text>
      </View>
    );
  }
}
