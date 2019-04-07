"use strict";
import React from "react";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";

const AuthButton = inject("fakeAuth")(
    observer(props => {
        const {
            match,
            location,
            history,
            fakeAuth: { isAuthenticated, authenticate, type, signout }
        } = props;

        let msg = "Welcome!";
        try {
            msg = location.state.error.msg;
        } catch (e) {}

        return isAuthenticated ? (
            <p>
                {msg}
                <button
                    onClick={() => {
                        signout(() => history.push("/"));
                    }}
                >
                    Sign out
                </button>
            </p>
        ) : (
            <p>You are not logged in</p>
        );
    })
);

export default withRouter(AuthButton);
