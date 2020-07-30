import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { BoxShadow } from "react-native-shadow";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";

const CustomButton = (props) => {
  const shadowOpt = {
    width: 80,
    height: 40,
    color: "#ffffff",
    border: 3,
    radius: 3,
    opacity: 1,
    x: 0,
    y: 0,
    style: {
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
  };
  return (
    <BoxShadow setting={shadowOpt}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
        <LinearGradient
          colors={[Colors.primary, Colors.accent]}
          style={styles.gradient}
        >
          <Text style={styles.btnText}>KATIL</Text>
        </LinearGradient>
      </TouchableOpacity>
    </BoxShadow>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",

    shadowColor: "white",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  gradient: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomButton;
