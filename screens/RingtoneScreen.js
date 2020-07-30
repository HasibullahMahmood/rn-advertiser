import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const RingtoneScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Ringtone Screen</Text>
    </View>
  );
};

RingtoneScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Ringtone",
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

export default RingtoneScreen;
