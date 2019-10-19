import React, {Component, lazy, Suspense, Fragment} from "react";
import {createHashHistory, createBrowserHistory} from "history";
const history = createHashHistory();

export default class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    _handleBack = () => {
        history.goBack();
    };

    _handleRef = () => {
        window.location.reload();
    };

    render() {
        const {text} = this.props;
        return (
            <div>
                <h3>{text}</h3>
                <p>
                    <button onClick={this._handleRef}>刷新</button>
                </p>
                <p>
                    <button onClick={this._handleBack}>返回上一页</button>
                </p>
            </div>
        );
    }
}
