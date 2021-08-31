import React from "react";
import {Button,Image,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login';
import Accueil from '../screens/accueil';
import Add from '../screens/add';
const Stack = createStackNavigator();
  export default class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = { }
    };
    logout(){
      fetch(Getuser)
      .then(response => response.text())
      .then((text) =>{
          if(text!=0){
           var user =text.split('||');
           this.props.navigation.navigate("Commandes",{id:user[0],name:user[1],role:user[2]})
          }else
          this.props.navigation.navigate("Login",{token:token})
      })
      .catch(error =>{alert(error)});
    }
    render() {
        return (
            <NavigationContainer>
              <Stack.Navigator>
               <Stack.Screen 
                  name="Add" 
                  component={Add} 
                  options={{ headerShown: true }}
                />
                <Stack.Screen 
                  name="Login" 
                  component={Login} 
                  options={{ headerShown: false }}
                />
                <Stack.Screen 
                  name="Accueil" 
                  component={Accueil} 
                  options={{ 
                    headerShown: true
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
        )
    }
}