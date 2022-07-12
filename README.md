# Overview
This chat application was created using React Native for mobile devices. The application provides users with a chat interface and options to share images and their location.

## User Stories
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Technologies Used
React Native, Expo, Google Firestore/Firebase

## Development Setup
* Install expo-cli using `npm install expo-cli --global`.
* After cloning the repository, install all necessary dependencies listed below.
* Launch app from the root folder using `expo start` or `npm start`.
* To see the application, you'll need to use the Expo app for your phone or install an emulator.

## Libraries & Dependencies to Install
* Gifted Chat Library `npm install react-native-gifted-chat --save`
* React Navigation Library `npm install --save react-navigation`
    * React Navigation Stack `npm install @react-navigation/native @react-navigation/stack`
    * More React Navigation Dependencies `expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`
* Firestone (via Firebase) `npm install --save firebase@7.9.0`
* React Native AsyncStorage `expo install @react-native-community/async-storage`
* React Native NetInfo `expo install @react-native-community/netinfo`
* Expo's ImagePicker `expo install expo-image-picker`
* Expo's Location `expo install expo-location`
* Expo's React Native Maps `expo install react-native-maps`

## Configuration of Database
This application can be used through your own Firebase database account. To do so you'll need to create a new project in [Google Firebase](https://firebase.google.com/). After registering your new project, be sure to copy your conents of `firebaseConfig` in the `Chat.js` file.

