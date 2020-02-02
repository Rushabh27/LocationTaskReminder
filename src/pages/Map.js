import React  from 'react';
import {Component} from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';

import {
  Platform,
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
    backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  }
});


export default class Map extends Component {
  constructor(props) {
    super(props);
	global.dist=0;
	this.state={
		latitude: 0,
        longitude: 0,
		dist:0
	}

  }
  

  render() {
	  
	  LocationIQ.init("4e5b5d3f9046aa"); // use a valid API key
    var lat,lon;
    const {navigation}=this.props;
    var t=JSON.stringify(navigation.getParam('t','NO-TASK'));
    //var l=JSON.stringify(navigation.getParam('l','locations'));
    console.log(t);
    LocationIQ.search(t)
        .then(json => {
          console.log("Coordinate");
             lat = json[0].lat;
             lon = json[0].lon;
            
            console.log(lat, lon);
			
			
		navigator.geolocation.getCurrentPosition(
    function(position) {
		
		var x=geolib.getDistance(position.coords, {
                latitude: lat,
                longitude: lon,
            });
        console.log(x/1000,'km');
		global.dist=x/1000+'km';
		//console.log(this.state.dist);
    },
    () => {
        alert('Position could not be determined.');
    },
			//console.log(x/1000,'km'),
	
);
			this.setState({
				latitude:lat,
				longitude:lon
				});
			
        })
        .catch(error => console.warn(error));
		
		
		
		
    return (
      <View style={styles.container}>
	  
	  <MapView style={styles.map}
          initialRegion={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude)
            //latitudeDelta:22,
            //longitudeDelta:22
          }}>
		  
		  <MapView.Marker
          coordinate={{
            latitude:Number(this.state.latitude),
            longitude:Number(this.state.longitude)
          }}></MapView.Marker>
		  
      </MapView>
	  <View style={styles.bottomView}>
	  <Text style={styles.txtStyle}>{global.dist}</Text>
	  </View>
	  </View>
    );
  }
}