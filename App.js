import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import {Component} from 'react';
import AppNavigator from './navigation/AppNavigator';



import * as WebBrowser from 'expo-web-browser';
//import React,{Component}from 'react';
//import firebase from 'firebase';

/*export default class App extends Component {

	componentWillMount()
	{
			const firebaseConfig = {
			  apiKey: "AIzaSyDLs_YS5Es3SY9Xmqzk7axHBN-5gi3C_CI",
			  authDomain: "location-reminder-5f94e.firebaseapp.com",
			  databaseURL: "https://location-reminder-5f94e.firebaseio.com",
			  projectId: "location-reminder-5f94e",
			  storageBucket: "location-reminder-5f94e.appspot.com",
			  messagingSenderId: "164112422729",
			  appId: "1:164112422729:web:17cbfa731b20657d1aac98",
			  measurementId: "G-QPNQ39XLDB"
			};
		firebase.initializeApp(firebaseConfig);
		console.log(firebase);
		firebase.database().ref('user/001').set({
			
			name: 'darshan',
			age: 20
		}).then(() => {
			console.log('inserted !');
		}).catch((error)=>{
			console.log(error);
		});
	}
	
    render(){
        return(
            <View >
      </View>
        )
    }
}*/

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
	
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
