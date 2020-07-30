import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AddRingtoneScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>AddRingtone Screen</Text>
    </View>
  );
};

AddRingtoneScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Add Ringtone Screen",
  };
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: Colors.accent,
    marginTop: 1,
  },
});

export default AddRingtoneScreen;
