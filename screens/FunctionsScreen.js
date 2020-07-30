import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Button,
  NativeEventEmitter,
} from "react-native";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
// @ts-ignore
import HeadphoneDetection from "react-native-headphone-detection";

const FunctionsScreen = (props) => {
  const [isHeadphoneConnected, setIsHeadphoneConnected] = useState(false);
  const [ringMode, setRingMode] = useState();
  const [ringtoneTitle, setRingtoneTitle] = useState();
  const [ringtoneVolume, setRingtoneVolume] = useState();

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(
      NativeModules.RingtoneVolumeModule
    );
    const eventListener = eventEmitter.addListener(
      "onVolumeChange",
      (event) => {
        setRingtoneVolume(event.volume);
      }
    );

    return () => {
      eventListener.remove(); //Removes the listener
    };
  }, []);

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.RingModeModule);
    const eventListener = eventEmitter.addListener("onModeChange", (event) => {
      setRingMode(event.currentVolume);
    });

    return () => {
      eventListener.remove(); //Removes the listener
    };
  }, []);

  const headphoneDetectionHandler = (result) => {
    setIsHeadphoneConnected(result.audioJack);
  };

  HeadphoneDetection.addListener(headphoneDetectionHandler);

  if (HeadphoneDetection.remove) {
    // The remove is not necessary on Android
    HeadphoneDetection.remove();
  }

  const getRingMode = () => {
    NativeModules.RingModeModule.getRingMode(
      (err) => {
        console.log(err);
      },
      (mode) => {
        setRingMode(mode);
      }
    );
  };

  const getRingtoneTitle = () => {
    NativeModules.RingtoneTitleModule.getRingtoneTitle(
      (err) => {
        console.log(err);
      },
      (title) => {
        setRingtoneTitle(title);
      }
    );
  };

  const getRingtoneCurrentVolumeLevel = () => {
    NativeModules.RingtoneVolumeModule.getRingtoneCurrentVolume(
      (err) => {
        console.log(err);
      },
      (volume) => {
        setRingtoneVolume(volume);
      }
    );
  };

  useEffect(() => {
    refresh();
  }, [getRingMode, getRingtoneTitle, getRingtoneCurrentVolumeLevel]);

  const refresh = () => {
    getRingMode();
    getRingtoneTitle();
    getRingtoneCurrentVolumeLevel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Is headphone jack connected: {isHeadphoneConnected ? "true" : "false"}
      </Text>
      <Text style={styles.text}>Ringer Mode: {ringMode}</Text>
      <Text style={styles.text}>Ringtone Title: {ringtoneTitle}</Text>
      <Text style={styles.text}>Ringtone Volume: {ringtoneVolume}</Text>
      <Button title="Refresh" onPress={refresh} />
    </View>
  );
};

FunctionsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Functions Screen",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-list" : "ios-list"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
  },
});

export default FunctionsScreen;
