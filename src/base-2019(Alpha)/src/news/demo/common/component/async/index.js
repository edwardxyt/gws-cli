"use strict";
import React, {lazy, Suspense, Fragment} from "react";
import Loading from "./loading";
import NotFound from "../notFound";

const log = console.log;

function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {Component: AsyncComponent.Component};
        }

        static Component = null;

        UNSAFE_componentWillMount() {
            if (!this.state.Component) {
                log("asyncComponent");
                getComponent().then(Component => {
                    AsyncComponent.Component = Component;
                    this.setState({Component});
                });
            }
        }
        render() {
            const {Component} = this.state;
            if (Component) {
                if (Component == 101) {
                    return <NotFound {...this.props} text={"加载页面失败"} />;
                } else {
                    return <Component {...this.props} />;
                }
            }
            return <Loading />;
        }
    };
}

export default asyncComponent;
