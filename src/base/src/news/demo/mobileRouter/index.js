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
const log = console.log;

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
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        // @babel/plugin-proposal-do-expressions
        let a = do {
            if (1 > 10) {
                ("big");
            } else {
                ("small");
            }
        };
        log("@babel/plugin-proposal-do-expressions - ", a);

        // @babel/plugin-proposal-optional-chaining
        const obj = {
            foo: {
                bar: {
                    baz: 42
                }
            },
            ed: null
        };
        const baz = obj?.foo?.bar?.baz;
        log("@babel/plugin-proposal-optional-chaining - ", baz);

        // @babel/plugin-proposal-nullish-coalescing-operator
        let foo = obj.ed ?? "default";
        log("@babel/plugin-proposal-nullish-coalescing-operator - ", foo);

        // @babel/plugin-proposal-pipeline-operator
        let pipeline =
            "hello" |> this.doubleSay |> this.capitalize |> this.exclaim;
        log("@babel/plugin-proposal-pipeline-operator - ", pipeline);

        // @babel/plugin-proposal-numeric-separator
        let budget = 1_000_000_000_000;
        log("@babel/plugin-proposal-numeric-separator - ", budget);

        // @babel/plugin-proposal-throw-expressions
        // log(
        //     throw new Error(
        //         "console.log的参数必须是一个表达式，如果是一个throw语句就会报错。"
        //     )
        // );

        // @babel/plugin-proposal-partial-application
        const addOne = this.add(1, ?);
        log('@babel/plugin-proposal-partial-application - ', addOne(2));
    }

    doubleSay(str) {
        return str + ", " + str;
    }

    capitalize(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    exclaim(str) {
        return str + "!";
    }

    add(x, y) {
        return x + y;
    }

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
