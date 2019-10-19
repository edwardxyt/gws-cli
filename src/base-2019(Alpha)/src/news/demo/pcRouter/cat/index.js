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
                    我们可以在这里换掉 <p> 的 <Cat>   ......
                    但是接着我们需要创建一个单独的 <MouseWithSomethingElse>
                    每次我们需要使用它时，<Mouse> 是不是真的可以重复使用.
                */}
                <Cat mouse={this.state} />
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
                <Mouse />
            </div>
        );
    }
}
