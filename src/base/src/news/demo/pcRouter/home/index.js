import React, {Component, lazy, Suspense, Fragment} from "react";
import PropTypes from "prop-types";
const log = console.log;
import ArraySort from "~/tool/arraySort";
let {bubbleSort} = new ArraySort();

import Parent from "../modal";

import shiliu from "~/image/shiliu.jpg";

import Button from "antd/es/button"; // 加载 JS
import "antd/es/button/style"; // 加载 LESS

import "./index.less";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    UNSAFE_componentWillMount() {
        // 冒泡排序
        bubbleSort([3, 1, 23]).then(data => {
            console.log(data);
        });
    }

    onClick = e => {
        this.setState({
            visible: !this.state.visible
        });
    };

    closeModal() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div>
                <h1 className="ed-home">这里是Home</h1>

                <Parent.Container>
                    <Parent.Modal visible={this.state.visible}>
                        <Button onClick={this::this.closeModal}>
                            closeModal
                        </Button>
                    </Parent.Modal>
                </Parent.Container>

                <Button onClick={this.onClick} type="primary">
                    Portals-modal-插槽
                </Button>
                <br />
                <img src={shiliu} alt="shiliu" />
                <br />
                <img src={require("~/image/shiliu.jpg")} alt="" />
            </div>
        );
    }
}

export default Home;
