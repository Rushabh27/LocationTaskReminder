import React,{Component}from 'react';

import {Actions} from 'react-native-router-flux';
import * as WebBrowser from 'expo-web-browser';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
import { getDistance } from 'geolib';
import firebase from 'firebase';
import {PureComponent} from 'react';

import { YellowBox } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import Geocoder from 'react-native-geocoding';
//import Geolocation from 'react-native-geolocation-service';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

export default class Start extends PureComponent {

    constructor(props) {
        YellowBox.ignoreWarnings(['Setting a timer']);
        super(props);
       //global.c=0;
        this.state={
			token:null,
			notification:null,
            latitude: 0,
          longitude: 0,
            dist:9999,
            location:'',
			task:''
        }
      }
      


    async componentDidMount() {
		LocationIQ.init("4e5b5d3f9046aa");
		var lat,lon;
		const {navigation}=this.props;
        var ref=firebase.database().ref('location');
		var l=(navigation.getParam('loc',null));
		
		
				
					
//        var query=ref.orderByChild("em").equalTo(global.em);
         if(l == null)
		{      
        ref.once("value",snapshot=>{
            snapshot.forEach(child=>{
              
                console.log(child.key,child.val().latitude,child.val().longitude);
                var lat1=child.val().latitude;
                var lon1=child.val().longitude;
                var loc=child.val().task;
				var tas=child.val().loc;
                
				navigator.geolocation.getCurrentPosition(
                    function(position){
                        var x=geolib.getDistance(position.coords,{
                            latitude:lat1,
                            longitude:lon1,
                        });
					
                        console.log(x/1000,'km');
                        var dis=x/1000;
                        
                        if(this.state.dist>=dis)
                        {
                            this.setState({dist:dis})
                            console.log(this.state.dist);
                            this.setState({latitude:lat1,
                                longitude:lon1,
								location:loc,
								task:tas
                                });
                        }
                                             
                        console.log("minimum",this.state.latitude,this.state.longitude);//this.state.location);
                        
                    }.bind(this),
                        ()=>{
                        alert("position cound nopt determine");
                    },
				);      
         });
    });
		}
		else
			{
				await LocationIQ.search(l)
			.then(json => {
					console.log("Coordinate");
					lat = json[0].lat;
					lon = json[0].lon;
					console.log(lat, lon);
					
					this.setState({latitude:lat,
                                longitude:lon
                                });
					
					
				})
				.catch(error => console.warn(error));
		
					
					ref.once("value",snapshot=>{
						snapshot.forEach(child=>{
              
						console.log(child.key,child.val().latitude,child.val().longitude);
						var lat1=child.val().latitude;
						var lon1=child.val().longitude;
						var loc=child.val().task;
						var tas=child.val().loc;
				//		console.log(lat1,lon1);
				//		console.log(this.state.latitude,this.state.longitude);
							var dis = geolib.getDistance({
							latitude:this.state.latitude,longitude:this.state.longitude},{
                            latitude:lat1,
                            longitude:lon1,
							});
							//console.log(dis/1000);
							//alert(`Distance\n${dis} Meter\nor\n${dis / 1000} KM`);
						var d=dis/1000;
                        
                        if(this.state.dist>=d)
                        {
                            this.setState({dist:d})
                            console.log(this.state.dist);
                            this.setState({latitude:lat1,
                                longitude:lon1,
								location:loc,
								task:tas
                                });
                        }
                        
					   console.log("minimum",this.state.latitude,this.state.longitude);//this.state.location);
                     
						});
					});	
		
			}
	
  }
	
 my=async()=>{
	const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } =  await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

    const token = await Notifications.getExpoPushTokenAsync();
	
	console.log(token);
	//console.log("task is"+this.state.location);
	 this.subscription = Notifications.addListener(this.handleNotification);
	
	this.setState({
      token,
    });
	if(this.state.task == "")
	{
		
   fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
		title: "REMAINDER",
        body: "NO TASK TO DO",
		 //sdata: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
	//Actions.home();
	}
	else
	{
		
			fetch('https://exp.host/--/api/v2/push/send', {
      body: JSON.stringify({
        to: token,
		title: "REMAINDER",
        body: "FINISH FIRST"+" "+this.state.location+" "+this.state.task,
		 //sdata: { message: `${title} - ${body}` },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
	Actions.afterLogin();
	}
	
	
 }

	handleNotification = notification => {
    this.setState({
      notification
    });
  };
   
    render(){
        
        return(
            <View style={styles.container}>
                

				
    					<TouchableOpacity onPress={this.my.bind(this)}>
					<Text>GO</Text>
				</TouchableOpacity>	   

				
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
      }
  });