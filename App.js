/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Feed from "./src/screen/Feed";
import Login from "./src/screen/Login";
import Profile from "./src/screen/Profile";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const Routes = createAppContainer(
  createStackNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    },
    Feed: {
      screen: Feed,
      navigationOptions: {
        title: "Feed"
      }
    },
    Profile: {
      screen: Profile,
    }
  }));


export default Routes;
