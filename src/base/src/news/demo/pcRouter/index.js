import React, {Component, lazy, Suspense, Fragment} from "react";
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

// 错误边界
import ErrorBoundary from "~/component/errorBoundary";
import NotFound from "~/component/notFound";
// import PrivateRoute from "~/component/privateRoute/index";

import Layout from "./layout/index";

const Home = lazy(() => import("./home"));
const About = lazy(() => import("./about"));
const Topics = lazy(() => import("./topics"));
const Context = lazy(() => import("./context"));
const Cat = lazy(() => import("./cat/render"));

export default class App extends React.Component {
    fallback = () => {
        return <div>Loading...</div>;
    };

    render() {
        return (
            <Provider {...stores}>
                <Router>
                    <Suspense fallback={this.fallback()}>
                        <ErrorBoundary>
                            <div className="root-main">
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={Layout(Home)}
                                    />
                                    <Route
                                        exact
                                        path="/about"
                                        component={Layout(About)}
                                    />
                                    <Route
                                        exact
                                        path="/topics/:name"
                                        component={Layout(Topics)}
                                    />
                                    <Route
                                        exact
                                        path="/context"
                                        component={Layout(Context)}
                                    />
                                    <Route
                                        exact
                                        path="/cat"
                                        component={Layout(Cat)}
                                    />
                                    {/* <PrivateRoute
                                        path="/context"
                                        component={Context}
                                        exact
                                    /> */}
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
