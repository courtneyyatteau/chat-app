import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      messages: [], //array of messages to be stored
    };
  }
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello " + this.props.route.params.name, //System message says Hello + user's name
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
    this.props.navigation.setOptions({ title: this.props.route.params.name }); //sets name at top of navigation
  }

  onSend(messages = []) {
    this.setState((oldState) => ({
      messages: GiftedChat.append(oldState.messages, messages), //adds old messages to array of messages
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            //styling for user bubble
            backgroundColor: "#9F2B68",
            padding: 5,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          },
          left: {
            //styling for the other person's bubble
            backgroundColor: "lightblue",
            padding: 5,
          },
        }}
        textStyle={{
          right: {
            fontSize: 19,
          },
          left: {
            fontSize: 19,
          },
        }}
      />
    );
  }

  render() {
    let { bckClr } = this.props.route.params;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bckClr, //sets background color from props
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
          renderBubble={this.renderBubble.bind(this)}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
