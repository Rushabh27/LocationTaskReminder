import React,{Component}from 'react';
import {PureComponent} from 'react';
import {Actions} from 'react-native-router-flux';
import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
import firebase from 'firebase';
//import DropdownMenu from 'react-native-dropdown-menu';
import { YellowBox } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Geocoder from 'react-native-geocoding';
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader} from 'react-native-indicator';
//import AnimatedLoader from "react-native-animated-loader";
//import { Dropdown } from 'react-native-material-dropdown';
//import Geolocation from 'react-native-geolocation-service';
import {
	TextInput,
  Platform,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

export default class edit extends React.Component {

    constructor(props) {
        YellowBox.ignoreWarnings(['Setting a timer']);
        super(props);
      //  global.items=[];
        this.state={
			isLoaded:true,
			task:'',
			location:'',
			listing:[],
        }
      }
 
		
     SampleFunction=()=>{
		 const {task,location}=this.state;
		 console.log(task,location);
		 if (task == "") {
				this.setState(() => ({ nameE: "Task required."}));
			} else {
				this.setState(() => ({ nameE: null}));
			}
			if (location == "") {
				this.setState(() => ({ nameError: "Location required."}));
			} else {
				this.setState(() => ({ nameError: null}));
			}
			if(task!='' && location!='')
			{
			var f=0,p;
		
	var ref=firebase.database().ref('location');
	ref.once("value",snapshot=>{
		snapshot.forEach(child=>{
		if(JSON.parse(child.val().task)==task)
		{			
			p=child.key;
			console.log(p);
			firebase.database().ref("location/"+p+"/loc").set(location);
		}
		})
	})

	console.log("success");
		}
	//console.log(query);
	//this.props.navigation.navigate('start',{loc:item});
  }

    render(){
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
				
				<TouchableOpacity style={styles.buton} onPress={this.SampleFunction.bind(this)}>
					<Text style={styles.buttonText}>GO</Text>
				</TouchableOpacity>	   

		</View>
		)
        
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
