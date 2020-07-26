import React, { useState, useEffect } from "react";
import { Button, View, StyleSheet } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const GoogleLogin = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    initAsync();
  }, [initAsync]);

  const initAsync = async () => {
    await GoogleSignIn.initAsync({
      androidClientId:
        "648316687890-h83h64ter3bmsfp4qgufhusoj1pv8id7.apps.googleusercontent.com",
    });
    _syncUserWithStateAsync();
  };

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        setUser(user);
        const expirationDate = new Date(
          new Date().getTime() + parseInt(3600) * 1000
        );
        authActions.saveDataToStorage(
          user.uid,
          user.auth.accessToken,
          expirationDate
        );
        props.navigation.navigate("Home");
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  return (
    <View style={styles.btnContainer}>
      <Button title="LOGIN WITH GOOGLE" onPress={signInAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 30,
  },
});

export default GoogleLogin;
