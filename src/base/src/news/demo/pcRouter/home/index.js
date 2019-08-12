import React, {Component, lazy, Suspense, Fragment} from "react";
import PropTypes from "prop-types";
import ArraySort from "~/tool/arraySort";
let {bubbleSort} = new ArraySort();

import shiliu from "~/image/shiliu.jpg";

import "./index.less";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        // 冒泡排序
        bubbleSort([3, 1, 23]).then(data => {
            console.log(data);
        });
    }

    render() {
        return (
            <div>
                <h1 className="ed-home">这里是Home</h1>
                <br />
                <img src={shiliu} alt="shiliu" />
                <br />
                <img src={require("~/image/shiliu.jpg")} alt="" />
            </div>
        );
    }
}

export default Home;
