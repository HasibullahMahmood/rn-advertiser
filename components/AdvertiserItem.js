import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons, Zocial } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";

const AdvertiserItem = (props) => {
  return (
    <LinearGradient
      colors={[Colors.accent, "#ffffff", "transparent"]}
      start={{ x: 1, y: 0 }}
      end={{ x: -1, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.advertiserNameContainer}>
        <Text style={styles.advertiserName}>TÜRKCELL</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.detailsContainer}>
        <View>
          <View style={styles.textContainer}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={18}
              color="black"
            />
            <Text style={styles.detailText}>1 HAFTA</Text>
          </View>
          <View style={styles.textContainer}>
            <Zocial name="call" size={18} color="black" />
            <Text style={styles.detailText}>1000</Text>
          </View>
          <View style={styles.textContainer}>
            <MaterialCommunityIcons
              name="currency-try"
              size={18}
              color="black"
            />
            <Text style={styles.detailText}>150 TL</Text>
          </View>
        </View>
        <CustomButton />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "17%",
    flexDirection: "row",
    marginBottom: 7,
  },
  advertiserNameContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  advertiserName: {
    color: Colors.accent,
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    width: 7,
    backgroundColor: Colors.accent,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  detailsContainer: {
    flexDirection: "row",
    margin: 10,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailText: {
    color: Colors.accent,
    marginLeft: 10,
  },

  textContainer: {
    flexDirection: "row",
  },
});

export default AdvertiserItem;
