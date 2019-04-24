import React from "react";
import { observer, inject } from "mobx-react";
import { DatePicker } from "antd";

import "./css.css";

const edward = {
	edward: "xiayuting"
};
window.console.log("我是index.js");
window.console.log(window.__API__, window.__CDN__, window.__ENV__, window.__DEBUG__, window.__PROJECT__);

@inject("fetchData")
@observer
class User extends React.Component {
	_AjaxHandle() {
		let { fetchAjax } = this.props.fetchData;
		fetchAjax();
	}
	_renderData() {
		let { fetchData } = this.props;
		let { data, state } = fetchData;

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
		let data = { a: 10, ...edward };
		return (
			<div>
                <div className="table">
                    <div className="row">
                        <div className="cell">A0</div>
                        <div className="cell">B0</div>
                    </div>
                </div>
                <div className="title">
                    <ul>
                        <li>{data.edward}</li>
                    </ul>
                    <DatePicker />
                </div>
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

export default User;
