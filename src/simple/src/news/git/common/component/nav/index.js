"use strict";
import React from "react";
import "./css.css";
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="nav">
                <NavLink
                    exact
                    to="/"
                    activeClassName="navBtnActive"
                    className="navBtnUnActive"
                >
                    首页
                </NavLink>
                <NavLink
                    exact
                    to="/user"
                    activeClassName="navBtnActive"
                    className="navBtnUnActive"
                >
                    用户
                </NavLink>
                <NavLink
                    exact
                    to="/tabs"
                    activeClassName="navBtnActive"
                    className="navBtnUnActive"
                >
                    TABS
                </NavLink>
            </div>
        );
    }
}

export default Nav;
