"use strict";
import React from "react";
import { Provider } from "mobx-react";
import { Route, BrowserRouter, HashRouter, Switch } from "react-router-dom";

import Home from "./home";
import stores from "../stores";

class Component extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default Component;
