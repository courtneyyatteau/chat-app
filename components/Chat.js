import React from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import MapView from "react-native-maps";
import CustomActions from "../CustomActions";

//Firebase Import
const firebase = require("firebase");
require("firebase/firestore");

// The name the user chose to input in the <Start /> screen has been accessed via 'this.props.route.params.name'.
// It then uses 'setOptions' to set the title of the screen to that name.
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
      },
      isConnected: false,
      image: null,
      location: null,
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
    // Takes the state of 'name' that was passed as a prop to <Chat /> and uses the prop sets it to the title of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    //Tell app where to find the messages
    this.referenceChatMessages = firebase.firestore().collection("messages");

    //Check if user is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log("online");

        //Authenticate user
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            },
          });

          this.refMsgsUser = firebase
            .firestore()
            .collection("messages")
            .where("uid", "==", this.state.uid);

          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate);
        });
      } else {
        this.getMessages();
        console.log("offline");
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
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
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages: messages,
    });
  };

  addMessage() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  //Save to to async storage
  async saveMessage() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  //Retrieve from async storage
  getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessage();
      }
    );
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

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
      //render nothing if offline
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
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
            _id: this.state.user._id,
          }}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderCustomView={this.renderCustomView}
          showUserAvatar={true}
          showAvatarForEveryMessage={true}
          renderActions={this.renderCustomActions}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
