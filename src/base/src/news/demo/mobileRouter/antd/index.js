import React from "react";
import {observer, inject} from "mobx-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const log = console.log;

import {Components} from "@edwardxyt/gws-javascripts";
import moment from "moment";

import TabBar from "antd-mobile/lib/tab-bar"; // 加载 JS
import "antd-mobile/lib/tab-bar/style"; // 加载 LESS

@inject("fetchData")
@observer
class Antd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "redTab",
            hidden: false
        };
        NProgress.start();
    }

    UNSAFE_componentWillMount() {
        log("match", this.props.match);
        log("location", this.props.location);
        log("history", this.props.history);
        NProgress.done();
    }

    renderContent(pageText) {
        return (
            <div
                style={{
                    backgroundColor: "white",
                    height: "100%",
                    textAlign: "center"
                }}
            >
                <div style={{paddingTop: 60}}>
                    Clicked “{pageText}” tab， show “{pageText}” information
                </div>
                <a
                    style={{
                        display: "block",
                        marginTop: 40,
                        marginBottom: 20,
                        color: "#108ee9"
                    }}
                    onClick={e => {
                        e.preventDefault();
                        this.setState({
                            hidden: !this.state.hidden
                        });
                    }}
                >
                    Click to show/hide tab-bar
                </a>
            </div>
        );
    }

    render() {
        return (
            <div
                style={{
                    position: "fixed",
                    height: "100%",
                    width: "100%",
                    top: 0
                }}
            >
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="top"
                >
                    <TabBar.Item
                        title="Life"
                        key="Life"
                        icon={
                            <div
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    background:
                                        "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat"
                                }}
                            />
                        }
                        selectedIcon={
                            <div
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    background:
                                        "url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat"
                                }}
                            />
                        }
                        selected={this.state.selectedTab === "blueTab"}
                        badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: "blueTab"
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent("Life")}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    background:
                                        "url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat"
                                }}
                            />
                        }
                        selectedIcon={
                            <div
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    background:
                                        "url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat"
                                }}
                            />
                        }
                        title="Koubei"
                        key="Koubei"
                        badge={"new"}
                        selected={this.state.selectedTab === "redTab"}
                        onPress={() => {
                            this.setState({
                                selectedTab: "redTab"
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent("Koubei")}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    background:
                                        "url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat"
                                }}
                            />
                        }
                        selectedIcon={
                            <div
                                style={{
                                    width: "22px",
                                    height: "22px",
                                    background:
                                        "url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat"
                                }}
                            />
                        }
                        title="Friend"
                        key="Friend"
                        dot
                        selected={this.state.selectedTab === "greenTab"}
                        onPress={() => {
                            this.setState({
                                selectedTab: "greenTab"
                            });
                        }}
                    >
                        {this.renderContent("Friend")}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={{
                            uri:
                                "https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg"
                        }}
                        selectedIcon={{
                            uri:
                                "https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg"
                        }}
                        title="My"
                        key="my"
                        selected={this.state.selectedTab === "yellowTab"}
                        onPress={() => {
                            this.setState({
                                selectedTab: "yellowTab"
                            });
                        }}
                    >
                        {this.renderContent("My")}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default Antd;
