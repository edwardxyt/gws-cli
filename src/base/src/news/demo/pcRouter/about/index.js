import React, {Component, lazy, Suspense, Fragment} from "react";
import {observer, inject} from "mobx-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const log = console.log;

import {createHashHistory, createBrowserHistory} from "history";
const history = createHashHistory();
import ArraySort from "~/tool/arraySort";
let {bubbleSort} = new ArraySort();

import DatePicker from "antd/es/date-picker"; // 加载 JS
import "antd/es/date-picker/style"; // 加载 LESS

import Button from "antd/es/button"; // 加载 JS
import "antd/es/button/style"; // 加载 LESS

import "./index.less";

@inject("clickTimes")
@observer
export default class About extends Component {
    constructor(props) {
        super(props);
        NProgress.start();
    }

    UNSAFE_componentWillMount() {
        log("match", this.props.match);
        log("location", this.props.location);
        log("history", this.props.history);
        log(history.location);
        // 冒泡排序
        bubbleSort([66, 212, 23]).then(data => {
            console.log(data);
        });
        NProgress.done();
    }

    _addHandle(num, e) {
        this.props.clickTimes.click(num);
    }

    onChange(date, dateString) {
        log(date, dateString);
    }

    onClick(e) {
        // const {history} = this.props;
        history.push("/topics/heliu", {name: "heliu"});
    }

    render() {
        return (
            <div>
                <h1 className="ed-about">这里是About</h1>
                <br />
                <Button onClick={this::this.onClick} type="primary">
                    跳转到Topics
                </Button>
                <br />
                <DatePicker onChange={this::this.onChange} />
                <div onClick={this._addHandle.bind(this, 1)}>
                    点击次数：{this.props.clickTimes.times}
                </div>
                <p>点击10次数：{this.props.clickTimes.total}</p>
                <p>获取IDS：{this.props.clickTimes.getId}</p>
            </div>
        );
    }
}

// export default About;
