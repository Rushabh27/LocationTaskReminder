import React  from 'react';
import {PureComponent} from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
//import PolylineDirection from '@react-native-maps/polyline-direction';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import {
  Platform,
  Permissions,
  Notifications,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
const styles=StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    },
	map: {
        position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
	  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#455a64',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
  }
});


export default class Map extends PureComponent {
  constructor(props) {
    YellowBox.ignoreWarnings(['Setting a timer']);
    super(props);
	this.state={
		latitude: 0,
        longitude: 0,
		d:0,
		listing:[],
		task:'',
		loc:''
	}

  }
  
 
  componentDidMount() {
 
	  LocationIQ.init("4e5b5d3f9046aa"); // use a valid API key
    var lat,lon;
	//global.dist=0;
    const {navigation}=this.props;
    var t=JSON.stringify(navigation.getParam('t','NO-TASK'));
    var l=JSON.stringify(navigation.getParam('l','locations'));
    //console.log(t);
    LocationIQ.search(t)
        .then(json => {
          //console.log("Coordinate");
             lat = json[0].lat;
             lon = json[0].lon;
			 
				var newdata={
					latitude:lat,
					longitude:lon,
					task:l,
					loc:t
				}
			
				firebase.database().ref('location').push(newdata);
			
            console.log(lat, lon);
		navigator.geolocation.getCurrentPosition(
		
    function(position) {

		var x=geolib.getDistance(position.coords, {
                latitude: lat,
                longitude: lon,
            });
        console.log(x/1000,'km');	
		global.dist=x/1000;
		this.setState({d:x/1000});
    }.bind(this),
    () => {
        alert('Position could not be determined.');
    },
);		
		this.setState({
				latitude:lat,
				longitude:lon
				//d:global.dist
				});	
			
        })
        .catch(error => console.warn(error));
		
			
  }

		render(){
    return (
      <View style={styles.container}>
	  
	  <MapView style={styles.map}
			zoomEnabled={true}
            showsUserLocation={true}
			followUserLocation = { true }
          initialRegion={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude),
            latitudeDelta:150,
            longitudeDelta:150
          }}>
		  
		  <MapView.Marker
          coordinate={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude)
          }}>
			
		  </MapView.Marker>
		  
      </MapView>
	 
	  <View style={styles.bottomView}>
	  <Text style={styles.textStyle}>{this.state.d} Km </Text>
	  </View>
	  </View>
    );
  }
}