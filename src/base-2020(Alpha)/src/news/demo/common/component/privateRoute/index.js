"use strict";
import React from "react";
import {Route, Redirect} from "react-router-dom";
import {observer, inject} from "mobx-react";

/*
 * 通过HOC高阶组件实现拦截路由跳转
 */

const PrivateRoute = inject("fakeAuth")(
    observer(
        ({
            fakeAuth: {isAuthenticated, isShow}, // type就是对应权限的哈希，单独写一个store里，
            component: Component,
            path,
            ...rest
        }) => {
            // console.log("privateRouter-from:", path);
            // console.log("privateRouter-referrer:", document.referrer);
            return (
                <Route
                    {...rest}
                    render={props =>
                        // 是否登录-是否现实
                        isAuthenticated ? (
                            isShow[path] ? (
                                <Component {...props} />
                            ) : (
                                <Redirect
                                    to={{
                                        pathname: "/", // 返回上一页还可以继续优化，这里只返回根
                                        state: {
                                            error: {
                                                from: props.location,
                                                code: 1108, // 便于以后将msg放入 映射表里
                                                msg: "您没权限查看"
                                            }
                                        }
                                    }}
                                />
                            )
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {from: props.location}
                                }}
                            />
                        )
                    }
                />
            );
        }
    )
);

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => <Component {...props} />} />
// );

export default PrivateRoute;
