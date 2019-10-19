"use strict";
// import "whatwg-fetch";
import React from "react";
import { Provider } from "mobx-react";
import {
    HashRouter as Router,
    // BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";

import Home from "./home";
import Nav from "../common/component/nav";
import Load from "../common/component/load";
import Error from "../common/component/error";
import asyncComponent from "../common/component/async";
import "../common/css/css.css";
import stores from "../stores";
const userRouter = asyncComponent(() =>
	import("./user/index")
	.then(module => module.default)
	.catch(err => {
		window.console.log(err)
		return 101;
	})
);

const tabsRouter = asyncComponent(() =>
	import("./tabs/index")
	.then(module => module.default)
	.catch(err => {
		window.console.log(err)
		return 101;
	})
);

class Component extends React.Component {
	render() {
		return (
			<Provider {...stores}>
                <Router>
                    <div className="container">
                        <Nav />
                        <Load />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/user" component={userRouter} />
                            <Route exact path="/tabs" component={tabsRouter} />
                            <Route component={Error} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
		);
	}
}

export default Component;
