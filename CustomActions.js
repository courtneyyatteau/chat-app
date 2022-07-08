import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function CustomActions(props) {
  const { showActionSheetWithOptions } = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return pickImage();
          case 1:
            console.log("user wants to take a photo");
            return takePhoto();
          case 2:
            console.log("user wants to get their location");
            return getLocation();
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="More media options"
      accessibilityHint="Choose an image from your camera roll, take a picture to send, or your share your location."
    >
      <View style={[styles.wrapper, props.wrapperStyle]}>
        <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
