import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Button
        title="LOGOUT"
        onPress={() => {
          dispatch(authActions.logout());
          props.navigation.navigate("Auth");
        }}
      />
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Profile Screen",
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

export default ProfileScreen;
