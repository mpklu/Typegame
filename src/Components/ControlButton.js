import React, {Component} from 'react';
import { observer } from 'mobx-react';

class ControlButton extends Component {
    render() {
        console.log(this.props);
        return (
            <button onClick = { this.clicked.bind(this) }>
                {this.props.gameState.title}
            </button>
        );
    }

    clicked() {
        if (this.props.gameState.stopped) {
            console.log("clicked Resume!");
            this.props.gameState.stopped = false;
        } else {
            console.log("clicked Stop!");
            this.props.gameState.stopped = true;
        }
    }
}

export default observer(ControlButton);