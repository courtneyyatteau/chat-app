import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import NetInfo from "@react-native-community/netinfo";

const firebase = require("firebase");
require("firebase/firestore");

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      uid: 0,
      messages: [], //array of messages to be stored
      isConnected: false,
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
    this.referenceChatMessages = null;
  }
  componentDidMount() {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
      } else {
        console.log("offline");
      }
    });
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      this.referenceMessagesUser = firebase
        .firestore()
        .collection("messages")
        .where("uid", "==", this.state.uid);
      this.unsubscribeListUser = this.referenceMessagesUser
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
    this.props.navigation.setOptions({ title: this.props.route.params.name }); //sets name at top of navigation
    this.getMessages();
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }

  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
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
        this.saveMessages();
        this.addMessages();
      }
    );
  }

  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
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
            avatar: "https://placeimg.com/140/140/any",
          }}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          showUserAvatar={true}
          showAvatarForEveryMessage={true}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
