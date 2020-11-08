import React, {Component, lazy, Suspense, Fragment} from "react";
import ReactDOM from "react-dom";

const log = console.log;
const modalRoot = document.getElementById("modal");

class Container extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
        // this.el.setAttribute("class", "modalContainer");
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {clicks: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // 当子元素里的按钮被点击时，
        // 这个将会被触发更新父元素的 state，
        // 即使这个按钮在 DOM 中不是直接关联的后代
        this.setState(state => ({
            clicks: state.clicks + 1
        }));
    }

    render() {
        const {visible} = this.props;

        let modalContainer = {
            display: visible ? "inline" : "none",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,.7)",
            zIndex: 100
        };

        let modal = {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "400px",
            backgroundColor: "#fff",
            zIndex: 101
        };

        return (
            <div style={modalContainer}>
                <div style={modal}>
                    <p onClick={this.handleClick}>
                        Number of clicks: {this.state.clicks}
                    </p>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

// export {Container, Modal};
// import {Container, Modal} from "../modal";

export default {
    Container,
    Modal
};
