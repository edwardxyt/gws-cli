"use strict";
import React from "react";
import { Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";

@inject("fakeAuth")
@observer
class Login extends React.Component {
    login = () => {
        this.props.fakeAuth.authenticate(() => {
            console.log("登录成功！");
        });
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/" }
        };

        console.log("login-from:", from.pathname);

        if (this.props.fakeAuth.isAuthenticated) {
            return <Redirect to={from.pathname} />;
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}
export default Login;
