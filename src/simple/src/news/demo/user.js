import React from "react";
import { observer, inject } from "mobx-react";
import { Card, DatePicker } from "antd";
import { Components } from "@edwardxyt/gws-javascripts";
import moment from "moment";

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
    // 搜索提交
    handleSearch = form => e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            console.log("Received values of form: ", values);
        });
    };
    render() {
        let data = { a: 10, ...edward };
        const filterDate = [
            {
                type: "text",
                label: "姓名",
                name: "name",
                placeholder: "请输入",
                initialValue: "123",
                rules: [
                    {
                        required: true,
                        message: "Input something!"
                    }
                ]
            },
            {
                type: "datePicker",
                label: "日期",
                name: "datePicker",
                placeholder: "请选择日期",
                initialValue: moment(),
                rules: [
                    {
                        required: true,
                        message: "请选择日期!"
                    }
                ]
            },
            {
                type: "rangePicker",
                label: "日期范围",
                name: "rangePicker",
                initialValue: [],
                rules: [
                    {
                        required: true,
                        message: "请选择日期范围!"
                    }
                ]
            },
            {
                type: "select",
                label: "下拉",
                name: "select",
                placeholder: "请选择",
                initialValue: "jack",
                options: [
                    { title: "jack", value: "jack" },
                    { title: "lucy", value: "lucy" }
                ],
                rules: [
                    {
                        required: true,
                        message: "请选择内容!"
                    }
                ]
            },
            {
                type: "autoComplete",
                label: "补全",
                name: "autoComplete",
                placeholder: "try to type `b`",
                dataSource: ["Burns Bay Road", "Downing Street", "Wall Street"],
                onSearch: this.onSearch,
                rules: [
                    {
                        required: true,
                        message: "请选择内容!"
                    }
                ]
            },
            {
                type: "cascader",
                label: "级联",
                name: "cascader",
                placeholder: "请选择",
                options: [
                    {
                        value: "zhejiang",
                        label: "Zhejiang",
                        children: [
                            {
                                value: "hangzhou",
                                label: "Hangzhou",
                                children: [
                                    {
                                        value: "xihu",
                                        label: "West Lake"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: "jiangsu",
                        label: "Jiangsu",
                        children: [
                            {
                                value: "nanjing",
                                label: "Nanjing",
                                children: [
                                    {
                                        value: "zhonghuamen",
                                        label: "Zhong Hua Men"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                rules: [
                    {
                        required: true,
                        message: "请选择内容!"
                    }
                ]
            }
        ];
        return (
            <div>
                <Card>
                    <Components.Filter data={filterDate} cb={this.handleSearch} />
                </Card>
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
