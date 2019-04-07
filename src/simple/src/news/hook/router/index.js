"use strict";
import React from "react";
import { Provider } from "mobx-react";
import {
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from "react-router-dom";

import Home from "./home";
import AuthButton from "./home/authButton";
import Error from "../common/component/error";
import asyncComponent from "../common/component/async";
import commonStyle from "../common/css/css.css";
import stores from "../stores";

const Public = asyncComponent(() =>
    import("./public/index")
        .then(module => module.default)
        .catch(err => {
            return 101;
        })
);
const Login = asyncComponent(() =>
    import("./login/index")
        .then(module => module.default)
        .catch(err => {
            return 101;
        })
);
const Protected = asyncComponent(() =>
    import("./protected/index")
        .then(module => module.default)
        .catch(err => {
            return 101;
        })
);

const PrivateRoute = asyncComponent(() =>
    import("../common/component/privateRoute/index")
        .then(module => module.default)
        .catch(err => {
            return 101;
        })
);
const PrivateLink = asyncComponent(() =>
    import("../common/component/privateLink/index")
        .then(module => module.default)
        .catch(err => {
            return 101;
        })
);

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

// 认证登录状态
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

class AuthExample extends React.Component {
    render() {
        return (
            <Router>
                <Provider {...stores}>
                    <React.Fragment>
                        <AuthButton aaa="xiayuting" />
                        <ul>
                            <li>
                                <Link to={{ pathname: "/" }} replace>
                                    home Page
                                    注意这里的replace写法可以解决（Warning: Hash
                                    history cannot PUSH the same path; a new
                                    entry will not be added to the history
                                    stack）的BUG
                                </Link>
                            </li>
                            <li>
                                <Link to="/public">Public Page</Link>
                            </li>
                            <li>
                                <Link to="/protected">Protected Page</Link>
                            </li>
                            <li>
                                <PrivateLink show={true} to="/xxxx">
                                    xxxx
                                </PrivateLink>
                            </li>
                            <li>
                                <PrivateLink show={false} to="/yyyy">
                                    yyyy
                                </PrivateLink>
                            </li>
                        </ul>
                        <br />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/public" component={Public} />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute
                                path="/protected"
                                component={Protected}
                                exact
                            />
                            <Route component={Error} />
                        </Switch>
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}

export default AuthExample;
