import React, {Component, lazy, Suspense} from "react";
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

import ErrorBoundary from "~/component/errorBoundary";
import NotFound from "~/component/notFound";
const Home = lazy(() => import("./home"));
const Nav = lazy(() => import("./nav"));

// 按需加载
import asyncComponent from "~/component/async";
const Antd = asyncComponent(() =>
    import("./antd")
        .then(module => module.default)
        .catch(err => {
            window.console.log(err);
            return 101;
        })
);

// 按需加载
import Loadable from "react-loadable";
const Loading = () => "Loading...";

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

class App extends Component {
    constructor(props) {
        super(props);
    }

    fallback = () => {
        return <div>Loading...</div>;
    };

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
                },
                fun() {
                    return 10;
                }
            },
            nullish: null
        };
        const baz = obj?.foo?.bar?.baz;

        log(
            "@babel/plugin-proposal-optional-chaining - ",
            baz,
            obj?.foo?.fun?.()
        );

        // @babel/plugin-proposal-nullish-coalescing-operator
        let foo = obj.nullish ?? "default";
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
        // const addOne = this.add(1, ?);
        // log('@babel/plugin-proposal-partial-application - ', addOne(2));
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
                    <Suspense fallback={this.fallback()}>
                        <ErrorBoundary>
                            <div className="root-main">
                                <Nav />
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/about" component={About} />
                                    <Route
                                        path="/topics/:name"
                                        component={Topics}
                                    />
                                    <Route path="/antd" component={Antd} />
                                    <NotFound {...this.props} text={"404"} />
                                </Switch>
                            </div>
                        </ErrorBoundary>
                    </Suspense>
                </Router>
            </Provider>
        );
    }
}

export default App;
