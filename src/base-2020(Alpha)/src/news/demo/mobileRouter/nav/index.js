import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
const log = console.log;
import {createHashHistory, createBrowserHistory} from "history";
const history = createHashHistory();

import NavBar from "antd-mobile/lib/nav-bar"; // 加载 JS
import "antd-mobile/lib/nav-bar/style"; // 加载 LESS

import Icon from "antd-mobile/lib/icon"; // 加载 JS
import "antd-mobile/lib/icon/style"; // 加载 LESS

import Popover from "antd-mobile/lib/popover"; // 加载 JS
import "antd-mobile/lib/popover/style"; // 加载 LESS
const Item = Popover.Item;

const myImg = src => (
    <img
        src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`}
        className="am-icon am-icon-xs"
        alt=""
    />
);

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    UNSAFE_componentWillMount() {
        log(history.location);
    }

    onSelect = opt => {
        // console.log(opt.props.value);
        this.setState({
            visible: false
        });

        history.push(opt.props.value);
    };
    handleVisibleChange = visible => {
        this.setState({
            visible
        });
    };
    goBack = e => {
        history.goBack();
    };

    render() {
        return (
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.goBack}
                rightContent={
                    <Popover
                        mask
                        overlayClassName="fortest"
                        overlayStyle={{color: "currentColor"}}
                        visible={this.state.visible}
                        overlay={[
                            <Item
                                key="3"
                                value="/"
                                icon={<Icon type="home" />}
                                data-seed="logId"
                            >
                                Home
                            </Item>,
                            <Item
                                key="4"
                                value="/about?sort=name"
                                icon={myImg("tOtXhkIWzwotgGSeptou")}
                                data-seed="logId"
                            >
                                About
                            </Item>,
                            <Item
                                key="5"
                                value="/topics/xiayuting"
                                icon={myImg("PKAgAqZWJVNwKsAJSmXd")}
                                style={{whiteSpace: "nowrap"}}
                            >
                                Topics
                            </Item>,
                            <Item
                                key="6"
                                value="/antd"
                                icon={myImg("uQIYTFeRrjPELImDRrPt")}
                            >
                                <span style={{marginRight: 5}}>Antd</span>
                            </Item>
                        ]}
                        align={{
                            overflow: {adjustY: 0, adjustX: 0},
                            offset: [-10, 0]
                        }}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.onSelect}
                    >
                        <div
                            style={{
                                height: "100%",
                                padding: "0 15px",
                                marginRight: "-15px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <Icon type="ellipsis" />
                        </div>
                    </Popover>
                }
            >
                <Link to="/">Mobile NavBar</Link>
            </NavBar>
        );
    }
}

export default Nav;
