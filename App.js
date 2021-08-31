
import React from 'react';
import {LogBox } from 'react-native';
import Index from './navigation/Index';
export default class App extends React.Component{
  constructor(){
    super();
    LogBox.ignoreAllLogs(true)
  }
  render(){
    return (
      <Index style={{backgroundColor:"white"}}/>
    );
  }
}

