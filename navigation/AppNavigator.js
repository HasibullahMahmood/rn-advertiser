import React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import StartupScreen from "../screens/StartupScreen";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const navOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
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

const HomeStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: navOptions,
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: {
        drawerLabel: "Home",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <TouchableOpacity
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  AuthStack: AuthStackNavigator,
  AppDrawer: AppDrawerNavigator,
});

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 10,
    marginLeft: 15,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
export default createAppContainer(MainNavigator);
