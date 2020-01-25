import React, { Component } from 'react';
 
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
 
import { StackNavigator } from 'react-navigation';
 class SecondActivity extends Component
{
 static navigationOptions =
 {
    title: 'SecondActivity',
 };
 
 render()
 {
    return(
       <View style = { styles.MainContainer }>
 
          <Text style = { styles.TextStyle }> This is SecondActivity </Text>
 
       </View>
    );
 }
}