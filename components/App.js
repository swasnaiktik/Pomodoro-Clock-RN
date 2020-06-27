import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Constants from "expo-constants";
import Timer from "./Timer.js"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "space-around",
  },
  allButton:{
    flexDirection: "row",
  },
  button:{
    paddingLeft: 10,
    borderRadius: 5
  }
});


export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      start: false,
      pause: false,
      stop: false,
    }
    this.show = true
  
  } 

  startTimer = () => {
    this.setState({
      start: true,
      pause: false,
      stop: false,
      study: null,
      brake: null, 
    })
    this.show = false
  }

  pauseTimer = () => {
    this.setState({
      start: false,
      pause: true,
      stop: false,
    })
  }

  stopTimer = () =>{
    this.setState({
      start: false,
      pause: false,
      stop: true,
      study: null,
      brake: null
    })
    this.show = true
  }

  updateTimerStudy = (val) =>{
    this.setState({
      study: val
    })
  }

  updateTimerBrake = (val) =>{
    this.setState({
      brake: val
    })
  }


  render(){
    return (
      <View style={styles.container}>
        <Timer 
        {...this.state}
        />
        {true && <TextInput placeholder = "Study" keyboardType = "number-pad" onChangeText={text => this.updateTimerStudy(text)} value = {this.state.study}/>}
        {true && <TextInput placeholder = "Break" keyboardType = "number-pad"  onChangeText={text => this.updateTimerBrake(text)} value = {this.state.brake}/>}
          <Button title = "Start" 
          onPress = {this.startTimer}
          style = {styles.button}/>
          <Button title = "Pause" 
          onPress = {this.pauseTimer}
          style = {styles.button}/>
          <Button title = "Reset" 
          onPress = {this.stopTimer}
          style = {styles.button}/>
      </View>
    );
  }
}
