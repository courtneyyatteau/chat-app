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
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
