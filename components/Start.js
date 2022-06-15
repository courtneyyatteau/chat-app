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
  constructor() {
    super();
    this.state = {
      name: "",
      bckClr: "",
    };
  }

  changeBackgroundColor = (newClr) => {
    this.setState({ bckClr: newClr });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>Chat App</Text>
          </View>
          <View style={styles.lowerbox}>
            <TextInput
              style={styles.nameInput}
              placeholder="Your name "
              onChangeText={(newName) => this.setState({ name: newName })}
            />
            <Text style={styles.backgroundTitle}>Choose Background Color:</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "88%",
              }}
            >
              <Pressable onPress={() => this.changeBackgroundColor("#090C08")}>
                <Text
                  style={{
                    backgroundColor: "#090C08",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                ></Text>
              </Pressable>
              <Pressable onPress={() => this.changeBackgroundColor("#474056")}>
                <Text
                  style={{
                    backgroundColor: "#474056",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                ></Text>
              </Pressable>
              <Pressable onPress={() => this.changeBackgroundColor("#8A95A5")}>
                <Text
                  style={{
                    backgroundColor: "#8A95A5",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                ></Text>
              </Pressable>
              <Pressable onPress={() => this.changeBackgroundColor("#B9C6AE")}>
                <Text
                  style={{
                    backgroundColor: "#B9C6AE",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                ></Text>
              </Pressable>
            </View>
            <Pressable
              style={styles.chatBtn}
              onPress={() => {
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bckClr: this.state.bckClr,
                });
              }}
            >
              <Text style={styles.chatTxt}>Start Chatting</Text>
            </Pressable>
            <View>
              <Pressable>
                <Text></Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  titleBox: {
    width: "88%",
    paddingTop: 50,
    alignItems: "center",
    height: "44%",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  lowerbox: {
    backgroundColor: "#FFFFFF",
    height: "44%",
    width: "88%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  nameInput: {
    fontSize: 16,
    fontWeight: "300",
    borderColor: "#757083",
    borderWidth: 1,
    width: "88%",
    paddingLeft: "7%",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingRight: "5%",
  },
  backgroundTitle: {
    fontSize: 16,
    marginTop: 10,

    fontWeight: "300",
    color: "#757083",
    width: "88%",
  },
  chatBtn: {
    marginTop: 20,
    backgroundColor: "#757083",
    width: "88%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatTxt: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
