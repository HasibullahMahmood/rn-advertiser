import React from "react";
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import AuthScreen from "../screens/AuthScreen";
import AdvertisersScreen from "../screens/AdvertisersScreen";
import StartupScreen from "../screens/StartupScreen";
import RingtoneScreen from "../screens/RingtoneScreen";
import AddRingtoneScreen from "../screens/AddRingtoneScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FunctionsScreen from "../screens/FunctionsScreen";

import Colors from "../constants/Colors";

const navOptions = {
  headerStatusBarHeight: 0,
  headerBackground: () => (
    <LinearGradient
      colors={[Colors.accent, Colors.primary]}
      style={{ flex: 1 }}
    />
  ),
  // headerStyle: {
  //   backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  // },
  headerTitleStyle: {
    textAlign: "center",
    fontWeight: "bold",
    //fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    //fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const AuthStackNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: navOptions,
  }
);

const AdvertisersStackNavigator = createStackNavigator(
  {
    Advertisers: AdvertisersScreen,
  },
  {
    defaultNavigationOptions: navOptions,
  }
);

const RingtonesStackNavigator = createStackNavigator(
  {
    Ringtone: RingtoneScreen,
  },
  {
    defaultNavigationOptions: navOptions,
  }
);

const AddRingtoneStackNavigator = createStackNavigator(
  {
    AddRingtone: AddRingtoneScreen,
  },
  {
    defaultNavigationOptions: navOptions,
  }
);

const ProfileStackNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    Functions: FunctionsScreen,
  },
  {
    defaultNavigationOptions: navOptions,
  }
);

const tabScreenConfig = {
  Advertisers: {
    screen: AdvertisersStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <FontAwesome5 name="home" size={23} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primary,
    },
  },
  AddRingtone: {
    screen: AddRingtoneStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialCommunityIcons
            name="music-note-plus"
            size={26}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primary,
    },
  },
  Ringtones: {
    screen: RingtonesStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <FontAwesome name="music" size={24} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.primary,
    },
  },
  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome5 name="user-alt" size={24} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primary,
    },
  },
};

const AppTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
        labeled: false,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          showLabel: false,
          activeTintColor: Colors.primary,
        },
      });

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  AuthStack: AuthStackNavigator,
  AppTab: AppTabNavigator,
});

export default createAppContainer(MainNavigator);
