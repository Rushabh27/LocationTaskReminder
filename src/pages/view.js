import React  from 'react';
import {PureComponent} from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import LocationIQ from 'react-native-locationiq';
import Geolocation from 'react-native-geolocation-service';
//import Geocoder from 'react-native-geocoder';
import * as geolib from 'geolib';
import firebase from 'firebase';

import { YellowBox } from 'react-native';



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


export default class view extends PureComponent {

  constructor(props) {
    YellowBox.ignoreWarnings(['Setting a timer']);
    super(props);
	//global.dist=0;
	this.state={
		latitude: 0,
        longitude: 0,
		dist:0,
    listing:[],
    taskArray:[
         {
             latitude:22.2973142,
	  		 longitude:73.1942567
         },
         {
             latitude:22.8358542,
             longitude:74.2556784
         },

      ]
	}

  }
  

  componentDidMount() {
    

   
        var ref=firebase.database().ref('location');
       // ref.on('value',gotData,errData);
       // var query=ref.orderByChild("em").equalTo(global.em);
        ref.once('value').then((snapshot)=>{
         this.setState({listing:snapshot.val()});
		 console.log(snapshot.val());
		 console.log("variable");
		 console.log(this.state.listing[0]);
		 //snapshot.forEach(function(child){
              //  console.log(child.key,child.val(),child.val().x,child.val().y);
               // var lat=child.val().x;
               // var lon=child.val().y;
                
                //const obj = {'latitude':lat, 'longitrude':lon};
                
				// this.setState({
                //   taskArray: [...this.state.task, obj]
                // });
                // // 
              // const newArray = this.state.taskArray.slice(); // Create a copy
              // newArray.push(obj); // Push the object
              // this.setState({ taskArray: newArray });
                // const newFile = this.state.taskArray.map((file) => {

                //     return {...file, latitude: lat,longitude:lon};
                // });
                // this.setState({taskArray: newFile });
               // this.setState.taskArray({latitude:lat,longitude:lon})
               
        
      
    });

   // var email=AsyncStorage.getItem('name');
// 	  LocationIQ.init("4e5b5d3f9046aa"); // use a valid API key
//     var lat,lon;
// 	//global.dist=0;
//     const {navigation}=this.props;
//     var t=JSON.stringify(navigation.getParam('t','NO-TASK'));
//     //var l=JSON.stringify(navigation.getParam('l','locations'));
//     //console.log(t);
//     LocationIQ.search(t)
//         .then(json => {
//              lat = json[0].lat;
//              lon = json[0].lon;
//              var my = firebase.database().ref('task').push();
//              var newdata={
//                em:global.em,
//                task:t,
//                x:lat,
//                y:lon

//              }
//              my.push(newdata);
//             console.log(lat, lon);
// 		navigator.geolocation.getCurrentPosition(
		
    // function(position) {

		// var x=geolib.getDistance(position.coords, {
    //             latitude: lat,
    //             longitude: lon,
    //         });
    //     console.log(x/1000,'km');
		// global.dist=0;
		// global.dist=x/1000;
    
   
    // },
    // () => {
    //     alert('Position could not be determined.');
    // },
// );		
// 		this.setState({
// 				latitude:lat,
// 				longitude:lon
// 				//dist:dist
// 				});	
			
//         })
//         .catch(error => console.warn(error));		
  }
  


  



		render(){
			let d=global.dist;
    return (
      <View style={styles.container}>

	  {/* <MapView style={styles.map}
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
          }}></MapView.Marker>
		  
      </MapView>
	  <View style={styles.bottomView}>
	 {/* <Text style={styles.txtStyle}>{d}</Text>
      */}
       <MapView
              style={{ position: 'absolute',
              top: 0,
              left:0,
              right:0,
              bottom: 0}}
              initialRegion={{
                latitude: 22.2587,
                longitude: 71.1924,
                latitudeDelta: 0.6,
                longitudeDelta: 0.6,
              }}>

                {this.state.taskArray.map((coordinate) => {
                        return  (<MapView.Marker
                          onPress={() => alert('task:')}
                          coordinate={coordinate}
                          />)
            })}
        </MapView>
        
	
	  </View>
    );
  }
}
