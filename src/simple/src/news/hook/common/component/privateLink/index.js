"use strict";
import React from "react";
import { Link } from "react-router-dom";
import { observer, inject } from "mobx-react";

const PrivateLink = inject("fakeAuth")(
    observer(({ show, children, fakeAuth: { isAuthenticated }, ...rest }) => {
        return show && <Link {...rest}>{children}</Link>;
    })
);

export default PrivateLink;
