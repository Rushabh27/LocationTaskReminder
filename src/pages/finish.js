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

//import { Dropdown } from 'react-native-material-dropdown';
//import Geolocation from 'react-native-geolocation-service';
import {
  Platform,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

export default class Finish extends React.Component {

    constructor(props) {
        YellowBox.ignoreWarnings(['Setting a timer']);
        super(props);
      //  global.items=[];
        this.state={
			isLoaded:true,
			listing:[],
        }
      }
       
	 async componentDidMount(){
       var items = [];
     await  firebase.database().ref('location').on('value', snapshot=> {
            snapshot.forEach(childSnapshot=> {				
               var childKey = childSnapshot.key;
             var childData = JSON.parse(childSnapshot.val().loc);
              items.push(childData);
			 
            }) 
            //console.log("items_load: " + items);
        });
		await this.setState({ listing:[...this.state.listing, ...items ],isLoaded:false})
		//console.log("did: ");
		
    }
     SampleFunction=(item)=>{
	var ref=firebase.database().ref('location');
    var query=ref.orderByChild("task").equalTo(item);
	ref.once("value",snapshot=>{
		snapshot.forEach(child=>{
		if(JSON.parse(child.val().loc)==item)
		{			
			var p=child.key;
			ref.child(p).remove();
			return;
		}
		 })
	})
    alert(item);
	//console.log(query);
 
  }

    render(){
		//console.log("items: " + this.state.listing);
		if(this.state.isLoaded){
			return (<View><Text>'Loading..'</Text></View>);
		}
        return(
		
			
            <View style={styles.container}>	
			<Text style={styles.TextS}> SELECT ANY ONE TASK TO REMOVE </Text>
			 { this.state.listing.map((item, key)=>(
         <Text key={key} style={styles.TextStyle}  onPress={ this.SampleFunction.bind(this, item) }> { item } </Text>)
         )}
		</View>
		
        )
	
    }
}


const styles=StyleSheet.create({
    container: {
      backgroundColor: '#455a64',
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      },
 TextS:{
	 paddingTop:0,
	 
   fontSize : 20,
    textAlign: 'center'
 },
 TextStyle:{
	 paddingTop:22,
   fontSize : 25,
    textAlign: 'center'
 }
});