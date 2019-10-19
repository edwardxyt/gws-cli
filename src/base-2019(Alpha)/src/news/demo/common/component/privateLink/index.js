import React, {Component, lazy, Suspense, Fragment} from "react";
import {Link} from "react-router-dom";
import {observer, inject} from "mobx-react";

const PrivateLink = inject()(
    observer(({to, show, children}) => {
        return (
            show && (
                <Link to={to} replace>
                    {children}
                </Link>
            )
        );
    })
);

// const PrivateLink = inject("fakeAuth", "checkRouter")(
//     observer(
//         ({
//             to,
//             show,
//             children,
//             fakeAuth: {isAuthenticated},
//             checkRouter: {click}
//         }) => {
//             return (
//                 show && (
//                     <Link onClick={click(to.pathname)} to={to} replace>
//                         {children}
//                     </Link>
//                 )
//             );
//         }
//     )
// );

export default PrivateLink;
