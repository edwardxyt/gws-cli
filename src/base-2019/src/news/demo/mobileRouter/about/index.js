import React from "react";
import {observer, inject} from "mobx-react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const log = console.log;

import {createHashHistory, createBrowserHistory} from "history";
const history = createHashHistory();
import ArraySort from "~/tool/arraySort";
let {bubbleSort} = new ArraySort();

import Carousel from "antd-mobile/lib/carousel"; // 加载 JS
import "antd-mobile/lib/carousel/style"; // 加载 LESS

import Button from "antd-mobile/lib/button"; // 加载 JS
import "antd-mobile/lib/button/style"; // 加载 LESS

import WhiteSpace from "antd-mobile/lib/white-space"; // 加载 JS
import "antd-mobile/lib/white-space/style"; // 加载 LESS

import WingBlank from "antd-mobile/lib/wing-blank"; // 加载 JS
import "antd-mobile/lib/wing-blank/style"; // 加载 LESS

import "./index.less";

@inject("clickTimes")
@observer
class About extends React.Component {
    constructor(props) {
        super(props);
        NProgress.start();
        this.state = {
            data: ["1", "2", "3"],
            imgHeight: 176,
            slideIndex: 2
        };
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

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: [
                    "AiyWuByWklrrUDlFignR",
                    "TekJlZRVCjLFexlOCuWn",
                    "IJOtIlfsYdTyaDTRVrLI"
                ]
            });
        }, 100);
    }
    componentDidUpdate() {
        // After the new child element is rendered, change the slideIndex
        // https://github.com/FormidableLabs/nuka-carousel/issues/327
        if (this.state.slideIndex !== this.state.data.length - 1) {
            /* eslint react/no-did-update-set-state: 0 */
            this.setState({slideIndex: this.state.data.length - 1});
        }
    }

    _addHandle(num) {
        this.props.clickTimes.click(num);
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

                <div
                    onClick={() => {
                        this._addHandle(1);
                    }}
                >
                    点击次数：{this.props.clickTimes.times}
                </div>
                <p>点击10次数：{this.props.clickTimes.total}</p>
                <p>获取IDS：{this.props.clickTimes.getId}</p>

                <WingBlank>
                    <Button
                        onClick={() => {
                            this.setState({
                                data: this.state.data.concat(
                                    "AiyWuByWklrrUDlFignR"
                                )
                            });
                        }}
                    >
                        Click me to add child
                    </Button>
                    <WhiteSpace />
                    <Carousel
                        autoplay={false}
                        infinite
                        selectedIndex={this.state.slideIndex}
                        beforeChange={(from, to) =>
                            console.log(`slide from ${from} to ${to}`)
                        }
                        afterChange={index => console.log("slide to", index)}
                    >
                        {this.state.data.map((val, index) => (
                            <a
                                key={val + index}
                                href="http://www.alipay.com"
                                style={{
                                    display: "inline-block",
                                    width: "100%",
                                    height: this.state.imgHeight
                                }}
                            >
                                <img
                                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        verticalAlign: "top"
                                    }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(
                                            new Event("resize")
                                        );
                                        this.setState({imgHeight: "auto"});
                                    }}
                                />
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
            </div>
        );
    }
}

export default About;
