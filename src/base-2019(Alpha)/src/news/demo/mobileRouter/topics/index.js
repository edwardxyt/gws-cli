import React from "react";
import {observer, inject} from "mobx-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const log = console.log;

import {Components} from "@edwardxyt/gws-javascripts";
import moment from "moment";

@inject("fetchData")
@observer
class Topics extends React.Component {
    constructor(props) {
        super(props);
        NProgress.start();
    }

    UNSAFE_componentWillMount() {
        log("match", this.props.match);
        log("location", this.props.location);
        log("history", this.props.history);
        NProgress.done();
    }

    _AjaxHandle() {
        let {fetchAjax} = this.props.fetchData;
        fetchAjax();
        Components.showAlert("发出fetchAjax");
    }

    _renderData() {
        let {fetchData} = this.props;
        let {data, state} = fetchData;

        if (state == 0) {
            return "点击发送请求";
        } else if (state == 1) {
            return "正在请求";
        } else if (state == 2 && data != null) {
            return data;
        } else if (state == -1) {
            return "请求出错";
        }
    }

    render() {
        return (
            <div>
                <h1>这里是Topics</h1>
                <br />
                <div
                    onClick={() => {
                        this._AjaxHandle();
                    }}
                >
                    fetchAjax
                </div>
                <ul>{this._renderData()}</ul>
            </div>
        );
    }
}

export default Topics;
