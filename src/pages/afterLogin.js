//after login
import { YellowBox } from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
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


export default class afterLogin extends Component {

	 static navigationOptions=  {
   header: null
}
	
    constructor(props)
	{
		YellowBox.ignoreWarnings(['Setting a timer']);

		super(props);
		this.state={
			
		};
          this.myFunc1 = this.myFunc1.bind(this);
          this.myFunc2 = this.myFunc2.bind(this);
	}

    myFunc1= () => {
        Actions.home();
    }
    myFunc2= () =>{
        Actions.view();
    }
    myFunc3= () =>{
        Actions.start();
    }
	myFunc4= () =>{
        Actions.finish();
    }
	myFunc5= () =>{
		AsyncStorage.clear();
        Actions.login();
    }

render(){
	
    return(
        <View style={styles.container}>
        
           
            
            <TouchableOpacity style={styles.buton} onPress={this.myFunc1.bind(this)}>
                <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buton} onPress={this.myFunc2.bind(this)}>
                <Text style={styles.buttonText}>View Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buton} onPress={this.myFunc3.bind(this)}>
                <Text style={styles.buttonText}>Start Task</Text>
            </TouchableOpacity>
			<TouchableOpacity style={styles.buton} onPress={this.myFunc4.bind(this)}>
                <Text style={styles.buttonText}>Finish Task</Text>
            </TouchableOpacity>
			<TouchableOpacity style={styles.buton} onPress={this.myFunc5.bind(this)}>
                <Text style={styles.buttonText}>Logout</Text>
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
