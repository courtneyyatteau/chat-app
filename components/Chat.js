import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "This is a system message",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
    this.props.navigation.setOptions({ title: this.props.route.params.name });
  }

  onSend(messages = []) {
    this.setState((oldState) => ({
      messages: GiftedChat.append(oldState.messages, messages),
    }));
  }

  render() {
    let { bckClr } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bckClr,
        }}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          isTyping={true}
          alwaysShowSend={true}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
