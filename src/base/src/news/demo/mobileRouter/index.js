import React from "react";
import {Provider} from "mobx-react";
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from "react-router-dom";

import stores from "../stores";
import "~/less/global.less"; // 加载 LESS

import Loadable from "react-loadable";
const Loading = () => "Loading...";

import Home from "./home";
import Nav from "./nav";

const About = Loadable({
    loader: () => import("./about"),
    loading: Loading,
    delay: 150
});
const Topics = Loadable({
    loader: () => import("./topics"),
    loading: Loading,
    delay: 150
});
const Antd = Loadable({
    loader: () => import("./antd"),
    loading: Loading,
    delay: 150
});

class Component extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <div className="root-main">
                        <Nav />

                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/topics/:name" component={Topics} />
                        <Route path="/antd" component={Antd} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Component;
