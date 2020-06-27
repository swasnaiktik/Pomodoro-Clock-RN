import React from "react";
import { StyleSheet, Text, View, Vibration, Button} from 'react-native';

const styles = StyleSheet.create({
    container:{
        fontSize: 15,
   
    }
})

export default class Timer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            countMin:"00",
            countSec: "00",
        }
        this.status = "Stop"
        this.interval = null
        this.time = null
    }

    update = () => {
        this.status = "Set"
        this.min = this.props.study == null? 0 :Number(this.props.study)
        this.sec = this.props.brake == null ? 0 :Number(this.props.brake)

        this.setState({
            countMin: this.min + this.sec
        })
    }
    
    count = () => {
        if(!this.props.pause){
            if(this.state.countSec == 0){
                this.newSec = "59"
                this.newMin = Number(this.state.countMin) <= 10 ? "0" + (Number(this.state.countMin) - 1) || "0" : String(Number(this.state.countMin) - 1)
            }else{
                this.newSec = Number(this.state.countSec) <= 10 ? "0" + (Number(this.state.countSec) - 1) || "0" : String(Number(this.state.countSec) - 1)
                this.newMin = Number(this.state.countMin) == 0? "00": Number(this.state.countMin) < 10 ? "0" + (this.state.countMin) || "0" : String(this.state.countMin)
            }
            if(this.interval != null){
                if(this.state.countMin < +this.props.brake){
                    this.time = "Break time!"
                }else{
                    this.time = "Study time!"
                }
            }
            if(this.status == "Stop"){
                this.newSec = "00"
                this.newMin = "00"
            }
            this.setState({
                countMin: this.newMin,
                countSec: this.newSec,
            })
        }

    }


    test = () =>{
        if(this.props.start === true && this.status !== "Start"){
            this.status = "Start"
            if(this.interval == null){
                this.interval = setInterval(this.count, 1000)
            }
        }else if(this.props.stop === true){
            if(this.status == "Set"){
                this.setState({
                    countMin: "00",
                    countSec: "00"
                })
            }
            this.status = "Stop"
            this.time = null
        }else if(this.props.pause === true){
            this.status = "Pause"
        }if(this.state.countSec == 0 && this.state.countMin == 0){
            this.time = null
            this.status = "End"
            clearInterval(this.interval)
            this.interval = null
            Vibration.vibrate(1000)
        }
    }

    render(){
            this.test()
        return(
            <View style = {styles.container}>
                {<Text style = {{fontSize: 40}}>{this.state.countMin}: {this.state.countSec}</Text>}
                {Boolean(+this.props.study || +this.props.brake)
                && <Button title = "Set" onPress = {this.update} />}
                <Text>{this.time}</Text>
            </View>
        )
    
}
}

  