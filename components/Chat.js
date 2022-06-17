import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const firebase = require("firebase");
require("firebase/firestore");

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      messages: [], //array of messages to be stored
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyB8lw9rS88qgA3g6aGgj4OoylQJ8a8tgIo",
        authDomain: "test-3674c.firebaseapp.com",
        projectId: "test-3674c",
        storageBucket: "test-3674c.appspot.com",
        messagingSenderId: "101286040606",
        appId: "1:101286040606:web:97da078ea907c3da7dca0f",
        measurementId: "G-JHR6HGP84G",
      });
    }
  }
  componentDidMount() {
    let { name } = this.props.route.params;
    this.setState({
      messages: [],
    });
    this.props.navigation.setOptions({ title: this.props.route.params.name }); //sets name at top of navigation
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.unsubscribe = this.referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages: messages,
    });
  };

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
