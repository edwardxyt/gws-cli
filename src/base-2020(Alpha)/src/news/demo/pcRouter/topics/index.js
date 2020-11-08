import React, {Component, lazy, Suspense, Fragment} from "react";
import {observer, inject} from "mobx-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const log = console.log;

import Button from "antd/es/button"; // 加载 JS
import "antd/es/button/style"; // 加载 LESS

import Card from "antd/es/card"; // 加载 JS
import "antd/es/card/style"; // 加载 LESS

// import {Components} from "@edwardxyt/gws-javascripts";
import moment from "moment";

@inject("fetchData")
@observer
class Topics extends Component {
    constructor(props) {
        super(props);
        NProgress.start();
    }

    // UNSAFE_componentWillMount() {
    //     log("match", this.props.match);
    //     log("location", this.props.location);
    //     log("history", this.props.history);
    //     NProgress.done();
    // }

    _AjaxHandle() {
        let {fetchAjax} = this.props.fetchData;
        fetchAjax();
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

    // 搜索提交
    handleSearch = form => e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            console.log("Received values of form: ", values);
        });
    };

    render() {
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
                    {title: "jack", value: "jack"},
                    {title: "lucy", value: "lucy"}
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
                <h1>这里是Topics</h1>
                <br />
                <Card>
                    {/*<Components.Filter*/}
                    {/*    data={filterDate}*/}
                    {/*    cb={this.handleSearch}*/}
                    {/*/>*/}
                </Card>
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
