import React, {Component} from 'react';
import { observer } from 'mobx-react';
class GameStatus extends Component {
    render() {
        return (
            <p id="status">{this.props.gameState.status}</p>
        );
    }
}

export default observer(GameStatus);