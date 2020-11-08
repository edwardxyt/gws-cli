"use strict";
import React from "react";
import {Helmet} from "react-helmet";
const log = console.log;

import Layout from "antd/es/layout"; // 加载 JS
import "antd/es/layout/style"; // 加载 LESS

import "./index.less";

const {Header, Footer, Sider, Content} = Layout;

import PrivateLink from "~/component/privateLink/index";
import breadcrumbNameMap from "~/config/breadcrumbNameMap";

const LayoutCompnent = WrappedCompnent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                helmet: {}
            };
        }
        componentWillMount() {}

        componentDidMount() {
            const {match} = this.props;

            this.setState({
                helmet: breadcrumbNameMap[match.path]
            });
        }

        render() {
            const {helmet} = this.state;

            return (
                <Layout className="pc-layout">
                    {/* Helmet组件 必须在layout组件里部署才会生效 */}
                    <Helmet>
                        <title>{helmet.title}</title>
                        <meta
                            name="keywords"
                            content={`keywords:${helmet.keywords}`}
                        />
                        <meta
                            name="description"
                            content={`description:${helmet.description}`}
                        />
                    </Helmet>

                    {/* 头部组件 */}
                    <Header>
                        <h3 style={{color: "#fff"}}>{helmet.name}</h3>
                    </Header>

                    {/* 内容组件 */}
                    <Content className="layout-content">
                        <ul>
                            <li>
                                <PrivateLink show={true} to="/">
                                    single-page application
                                </PrivateLink>
                            </li>
                            <li>
                                <PrivateLink
                                    show={true}
                                    to={{
                                        pathname: "/about",
                                        search: "?sort=name",
                                        hash: "#the-hash",
                                        state: {fromDashboard: true}
                                    }}
                                >
                                    About
                                </PrivateLink>
                            </li>
                            <li>
                                <PrivateLink show={true} to="/topics/xiayuting">
                                    Topics
                                </PrivateLink>
                            </li>
                            <li>
                                <PrivateLink show={true} to="/context">
                                    ontext
                                </PrivateLink>
                            </li>
                            <li>
                                <PrivateLink show={true} to="/cat">
                                    cat
                                </PrivateLink>
                            </li>
                            <li>
                                <PrivateLink show={true} to="/notFound">
                                    error_404_page
                                </PrivateLink>
                            </li>
                        </ul>
                        {/* 路由映射 */}
                        <div className="main">
                            <WrappedCompnent {...this.props} />
                        </div>
                    </Content>
                    {/* 页底组件 */}
                    <Footer className="layout-footer">
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            );
        }
    };
};
export default LayoutCompnent;
