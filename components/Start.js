import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

import BackgroundImage from "../assets/BackgroundImage.png";

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      name: " ",
      bckClr: "white",
      borderRadius: 25,
      pressed: false,
      pressed2: false,
      pressed3: false,
      pressed4: false,
      borderClr: "white",
      borderClr2: "white",
      borderClr3: "white",
      borderClr4: "white",
    };
  }

  changeBackgroundColor = (newClr) => {
    this.setState({ bckClr: newClr });
  };

  changeBorder1 = (newBorder) => {
    if (!this.state.pressed) {
      this.setState({ pressed: true });
      this.setState({ borderClr: newBorder });
      this.setState({ pressed2: false });
      this.setState({ borderClr2: "white" });
      this.setState({ pressed3: false });
      this.setState({ borderClr3: "white" });
      this.setState({ pressed4: false });
      this.setState({ borderClr4: "white" });
      this.changeBackgroundColor("#090C08");
    }
    if (this.state.pressed) {
      this.setState({ pressed: false });
      this.setState({ borderClr: "white" });
      this.changeBackgroundColor("white");
    }
  };

  changeBorder2 = (newBorder) => {
    this.setState({ pressed2: true });
    this.setState({ borderClr2: newBorder });
    this.setState({ pressed: false });
    this.setState({ borderClr: "white" });
    this.setState({ pressed3: false });
    this.setState({ borderClr3: "white" });
    this.setState({ pressed4: false });
    this.setState({ borderClr4: "white" });
    this.changeBackgroundColor("#474056");
    if (this.state.pressed2) {
      this.setState({ pressed2: false });
      this.setState({ borderClr2: "white" });
      this.changeBackgroundColor("white");
    }
  };

  changeBorder3 = (newBorder) => {
    this.setState({ pressed3: true });
    this.setState({ borderClr3: newBorder });
    this.setState({ pressed: false });
    this.setState({ borderClr: "white" });
    this.setState({ pressed2: false });
    this.setState({ borderClr2: "white" });
    this.setState({ pressed4: false });
    this.setState({ borderClr4: "white" });
    this.changeBackgroundColor("#8A95A5");
    if (this.state.pressed3) {
      this.setState({ pressed3: false });
      this.setState({ borderClr3: "white" });
      this.changeBackgroundColor("white");
    }
  };

  changeBorder4 = (newBorder) => {
    this.setState({ pressed4: true });
    this.setState({ borderClr4: newBorder });
    this.setState({ pressed: false });
    this.setState({ borderClr: "white" });
    this.setState({ pressed3: false });
    this.setState({ borderClr3: "white" });
    this.setState({ pressed2: false });
    this.setState({ borderClr2: "white" });
    this.changeBackgroundColor("#B9C6AE");
    if (this.state.pressed4) {
      this.setState({ pressed4: false });
      this.setState({ borderClr4: "white" });
      this.changeBackgroundColor("white");
    }
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
              <Pressable
                onPress={() => {
                  this.changeBorder1("red");
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#090C08",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderColor: this.state.borderClr,
                    borderWidth: 3,
                  }}
                ></Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  this.changeBorder2("red");
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#474056",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderColor: this.state.borderClr2,
                    borderWidth: 3,
                  }}
                ></Text>
              </Pressable>
              <Pressable onPress={() => this.changeBorder3("red")}>
                <Text
                  style={{
                    backgroundColor: "#8A95A5",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderColor: this.state.borderClr3,
                    borderWidth: 3,
                  }}
                ></Text>
              </Pressable>
              <Pressable onPress={() => this.changeBorder4("red")}>
                <Text
                  style={{
                    backgroundColor: "#B9C6AE",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    borderColor: this.state.borderClr4,
                    borderWidth: 3,
                  }}
                ></Text>
              </Pressable>
            </View>
            <TouchableHighlight
              style={styles.chatBtn}
              onPress={() => {
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bckClr: this.state.bckClr,
                });
              }}
            >
              <Text style={styles.chatTxt}>Start Chatting</Text>
            </TouchableHighlight>
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
    height: "40%",
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
    marginBottom: 10
  },
  backgroundTitle: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
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
