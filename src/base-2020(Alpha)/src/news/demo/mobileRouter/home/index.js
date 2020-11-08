import React from "react";
import PropTypes from "prop-types";
import ArraySort from "~/tool/arraySort";
let {bubbleSort} = new ArraySort();

import shiliu from "~/image/shiliu.jpg";

import Flex from "antd-mobile/lib/flex"; // 加载 JS
import "antd-mobile/lib/flex/style"; // 加载 LESS

import WhiteSpace from "antd-mobile/lib/white-space"; // 加载 JS
import "antd-mobile/lib/white-space/style"; // 加载 LESS

import WingBlank from "antd-mobile/lib/wing-blank"; // 加载 JS
import "antd-mobile/lib/wing-blank/style"; // 加载 LESS

import Card from "antd-mobile/lib/card"; // 加载 JS
import "antd-mobile/lib/card/style"; // 加载 LESS

import "./index.less";

class Home extends React.Component {
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
        const PlaceHolder = ({className = "", ...restProps}) => (
            <div className={`${className} placeholder`} {...restProps}>
                Block
            </div>
        );

        return (
            <div>
                <div className="flex-container">
                    <div className="sub-title">这里是Home</div>
                    <div className="sub-title">Basic</div>
                    <Flex>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg" />
                    <Flex>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg" />
                    <Flex>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                        <Flex.Item>
                            <PlaceHolder />
                        </Flex.Item>
                    </Flex>
                    <WhiteSpace size="lg" />

                    <div className="sub-title">Wrap</div>
                    <Flex wrap="wrap">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                    </Flex>
                    <WhiteSpace size="lg" />

                    <div className="sub-title">Align</div>
                    <Flex justify="center">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                    </Flex>
                    <WhiteSpace />
                    <Flex justify="end">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                    </Flex>
                    <WhiteSpace />
                    <Flex justify="between">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline" />
                    </Flex>

                    <WhiteSpace />
                    <Flex align="start">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline small" />
                        <PlaceHolder className="inline" />
                    </Flex>
                    <WhiteSpace />
                    <Flex align="end">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline small" />
                        <PlaceHolder className="inline" />
                    </Flex>
                    <WhiteSpace />
                    <Flex align="baseline">
                        <PlaceHolder className="inline" />
                        <PlaceHolder className="inline small" />
                        <PlaceHolder className="inline" />
                    </Flex>
                </div>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                        <Card.Header
                            title="This is title"
                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                            extra={<span>this is extra</span>}
                        />
                        <Card.Body>
                            <img
                                className="ed-image"
                                src={shiliu}
                                alt="shiliu"
                            />
                            <br />
                            <img
                                className="ed-image"
                                src={require("~/image/shiliu.jpg")}
                                alt=""
                            />
                        </Card.Body>
                        <Card.Footer
                            content="footer content"
                            extra={<div>extra footer content</div>}
                        />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        );
    }
}

export default Home;
