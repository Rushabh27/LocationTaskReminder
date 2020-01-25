import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';
import {
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

export default class Home extends Component
{
	constructor(props)
	{
		super(props);
		this.state={
			msg:'error',
			task:'',
			location:'',
			loading:false,
		};
		 
	}
	
	myFunc= () => {
		
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
				console.log(task+location);
				this.task.clear();
				this.location.clear();
				Actions.map();
			}
	}
	
 
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
