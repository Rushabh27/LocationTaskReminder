import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import {Component} from 'react';
import AppNavigator from './navigation/AppNavigator';
import Routes from './src/Routes'


import * as WebBrowser from 'expo-web-browser';

export default class App extends Component {

	componentWillMount()
	{
			const firebaseConfig = {
			   apiKey: "AIzaSyDR6Q-c96bjsLqABehAL1m13z-QQ28ObB8",
  authDomain: "locationtaskremainder-74b7a.firebaseapp.com",
  databaseURL: "https://locationtaskremainder-74b7a.firebaseio.com",
  projectId: "locationtaskremainder-74b7a",
  storageBucket: "locationtaskremainder-74b7a.appspot.com",
  messagingSenderId: "1085289381045",
  appId: "1:1085289381045:web:f7f769c5b7c9c3529052fc",
  measurementId: "G-H322S3DYD2"
			};
			if(!firebase.apps.length){
		firebase.initializeApp(firebaseConfig);
			}
	}
	

  render(){
	console.disableYellowBox = true;
  return (
    <View style={styles.container}> 
      <Routes/>
    </View>  
  );
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
