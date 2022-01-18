import React, {Component, lazy, Suspense} from "react";
import { Provider, observer } from 'mobx-react'
import configureStore from '../store/index'
import './index.less';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

// 错误边界
import ErrorBoundary from "../component/errorBoundary";
const App = lazy(() => import("../pcRouter/App/index"));
const Home = lazy(() => import("../pcRouter/Home/index"));
const Login = lazy(() => import("../pcRouter/Login/index"));
const List = lazy(() => import("../pcRouter/List/index"));
const News = lazy(() => import("../pcRouter/List/News/index"));
const Item = lazy(() => import("../pcRouter/List/Item/index"));

interface MainProps {
}

@observer
export default class PcRouter extends Component<MainProps, {}> {
    fallback = () => {
        return <div>lazy Loading...</div>;
    };

    render() {
        return (
            <>
                {/*Suspense 是配合 react.lazy使用的*/}
                <Suspense fallback={this.fallback()}>
                    <Provider store={configureStore()}>
                        <BrowserRouter>
                            <ErrorBoundary>
                                <Routes>
                                    <Route path="/" element={<App/>}>
                                        <Route path="home" element={<Home/>}/>
                                        <Route path="login" element={<Login compiler="TypeScript" framework="React"/>}/>
                                        <Route path="list" element={<List/>}>
                                            {/*index路由渲染在父路由的outlet，而且路由地址和父路由相同*/}
                                            {/*index路由在父路由匹配并且其他子路由不匹配的时候 匹配*/}
                                            {/*index路由是一个父节点默认的子节点*/}
                                            {/*index路由在用户还没有点击导航中的链接时渲染*/}
                                            <Route
                                                index
                                                element={
                                                    <main style={{ padding: "1rem" }}>
                                                        <p>Select an list</p>
                                                    </main>
                                                }
                                            />
                                            <Route path="news" element={<News/>}/>
                                            <Route path=":id" element={<Item/>}/>
                                        </Route>
                                        {/*404*/}
                                        <Route
                                            path="*"
                                            element={
                                                <main style={{ padding: "1rem" }}>
                                                    <p>There's nothing here!</p>
                                                </main>
                                            }
                                        />
                                    </Route>
                                </Routes>
                            </ErrorBoundary>
                        </BrowserRouter>
                    </Provider>
                </Suspense>
            </>
        );
    }
}