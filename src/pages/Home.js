import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import { YellowBox } from 'react-native';
import {AsyncStorage} from 'react-native';
import {
	Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
export default class Home extends React.Component
{
	constructor(props)
	{
		YellowBox.ignoreWarnings(['Setting a timer']);
    
		super(props);
	this.state={
			token:null,
			notification:null,
			msg:'error',
			task:'',
			location:'',
			loading:false,
			 latitude: 0,
            longitude: 0,
            error: null,
            Address: null
		};
		 
	}
	
		
	myFunc= async() => {
		
		 const { status } =await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();
	console.log(token);
    this.subscription = Notifications.addListener(this.handleNotification);

    this.setState({
      token,
    });
			
		 
		
		
		const {task,location}=this.state;
			if (task === "") {
				this.setState(() => ({ nameE: "Task required."}));
			} else {
				this.setState(() => ({ nameE: null}));
			}
			if (location === "") {
				this.setState(() => ({ nameError: "Location required."}));
			} else {
				this.setState(() => ({ nameError: null}));
			}
			if(task!=''&&location!='')
			{
				 fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
		title: "REMAINDER",
        body: "TASK ADDED",
		 //sdata: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
				//		console.log(task+location);
				this.task.clear();
				this.location.clear();
				//Actions.map();
				this.props.navigation.navigate('map',{t:location});
			}
	}
	handleNotification = notification => {
    this.setState({
      notification,
    });
  };
 
 render()
 {
	 AsyncStorage.getItem('name').then(function(res){
			if(res==null)
	 {
		 Actions.login();
	 }	 
	 });
	 
    return(
       <View style = { styles.container }>
	
		
<TextInput style={styles.inputbox} value={this.state.task} underlineColorAndroid='rgba(0,0,0,0)' placeholder="Task" selectionColor='#fff' keyboardType="email-address" onChangeText={task => this.setState({task})} ref={(input)=> this.task = input} placeholderTextColor="#ffffff" />
						{!!this.state.nameE && (
					<Text style={{color: 'white'}}>
					{this.state.nameE}
						</Text>)}
				
				<TextInput style={styles.inputbox} value={this.state.location}  underlineColorAndroid='rgba(0,0,0,0)' placeholder="Location" onChangeText={location => this.setState({location})} ref={(input)=> this.location = input} placeholderTextColor="#ffffff" />
				
				{!!this.state.nameError && (
					<Text style={{color: 'white'}}>
					{this.state.nameError}
						</Text>)}
				
				<TouchableOpacity style={styles.buton} onPress={this.myFunc.bind(this)}>
					<Text style={styles.buttonText}>GO</Text>
				</TouchableOpacity>	   
	   </View>
    );
 }
}
const styles=StyleSheet.create({
    container: {
      
      backgroundColor: '#455a64',
      flexGrow:1,
      alignItems:'center',
      justifyContent:'center',
	
    },
	inputbox:{
		width:300,
		height:40,
		backgroundColor:'rgba(255,255,255,0.2)',
		borderRadius:25,
		paddingHorizontal:16,
		fontSize:16,
		color:'#ffffff',
		marginVertical:10,
	},
	buttonText:{
		fontSize:16,
		fontWeight:'500',
		color:'#ffffff',
		textAlign:'center',
	},
	buton:{
		width:300,
		height:40,
		backgroundColor:'#1c313a',
		borderRadius:25,
		marginVertical:10,
		paddingVertical:12,
		
		
	}
	
	
});
