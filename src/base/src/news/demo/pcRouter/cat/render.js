import React, {Component, lazy, Suspense, Fragment} from "react";
import cat from "~/image/cat.jpg";

class Cat extends Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img
                src={cat}
                style={{
                    width: "200px",
                    position: "absolute",
                    left: mouse.x,
                    top: mouse.y
                }}
            />
        );
    }
}

class Mouse extends Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x: 0, y: 0};
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{height: "100%"}} onMouseMove={this.handleMouseMove}>
                {/*
                    这里的this.state就是 mouse => <Cat mouse={mouse} 的mouse
                */}
                {this.props.render(this.state)}
            </div>
        );
    }
}

export default class MouseTracker extends Component {
    render() {
        return (
            <div
                style={{
                    border: "1px solid #369",
                    width: "800px",
                    height: "800px",
                    margin: "0 auto"
                }}
            >
                <h1>移动鼠标!</h1>
                <Mouse render={mouse => <Cat mouse={mouse} />} />
            </div>
        );
    }
}
