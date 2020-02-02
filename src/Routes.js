import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';

import {Router,Stack,Scene} from 'react-native-router-flux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Map from './pages/Map';

export default class Routes extends Component {
    render(){
        return(
            <Router>
				<Stack key="root">
					<Scene key="login" component={Login} title="Login" />
					<Scene key="signup" component={Signup} title="Register"/>
					<Scene key="home" component={Home} title="home" initial={true}/>
					<Scene key="map" component={Map} title="Map"/>

				</Stack>
			</Router>
        )
    }
}