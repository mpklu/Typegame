import React, { Component } from 'react';
import { observer } from 'mobx-react';

class MySound extends Component {
    componentWillMount() {
        this.audio = new Audio('theIceCreamMan.mp3');
        this.audio.loop = true;
    }
    render() { 
        if (this.props.gameState.stopped) {
            this.audio.pause();
        } else {
            // this.audio = new Audio('theIceCreamMan.mp3');
            this.audio.play();
        }

        return (
            <audio id="my_audio" />  
        );
       
    }
}
export default observer(MySound);