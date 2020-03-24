import * as WebBrowser from 'expo-web-browser';
import React,{Component}from 'react';

import {Router,Stack,Scene} from 'react-native-router-flux';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Map from './pages/Map';
import afterLogin from './pages/afterLogin';
import view from './pages/view';
import start from './pages/start';
import finish from './pages/finish';
export default class Routes extends Component {
    render(){
        return(
            <Router>
				<Stack key="root">
					<Scene key="login" component={Login} initial={true}/>
					<Scene key="signup" component={Signup}/>
					<Scene key="home" component={Home} title="home" />
					<Scene key="map" component={Map} title="Map"/>
					<Scene key="afterLogin" component={afterLogin}  />
					<Scene key="view" component={view} title="VIEW"/>
					<Scene key="start" component={start} title="START"/>
					<Scene key="finish" component={finish} title="Finish"/>
					
				</Stack>
			</Router>
        )
    }
}