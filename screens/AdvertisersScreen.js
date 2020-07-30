import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import AdvertiserItem from "../components/AdvertiserItem";

const AdvertisersScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AdvertiserItem />
      <AdvertiserItem />
      <AdvertiserItem />
    </View>
  );
};

AdvertisersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Reklam Verenler",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.accent,
    marginTop: 1,
    paddingTop: 25,
  },
});

export default AdvertisersScreen;
