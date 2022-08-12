import './index.less';

import { observer, Provider } from 'mobx-react';
import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 错误边界
import ErrorBoundary from '../component/errorBoundary/index';
import rootStore from '../store/index';

const App = lazy(() => import('../pcRouter/App/index'));
const Home = lazy(() => import('../pcRouter/Home/index'));
const Login = lazy(() => import('../pcRouter/Login/index'));
const List = lazy(() => import('./List/index'));
const News = lazy(() => import('./List/News/index'));
const Item = lazy(() => import('./List/Item/index'));
const Params = lazy(() => import('./List/Params/index'));

interface MainProps {}

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
                    <Provider store={rootStore()}>
                        <BrowserRouter
                            basename={
                                window.__POWERED_BY_QIANKUN__ ? '/pj1' : '/'
                            }
                        >
                            <ErrorBoundary>
                                <Routes>
                                    <Route path="/" element={<App />}>
                                        <Route path="home" element={<Home />} />
                                        <Route
                                            path="login"
                                            element={
                                                <Login
                                                    compiler="TypeScript"
                                                    framework="React"
                                                />
                                            }
                                        />
                                        <Route path="list" element={<List />}>
                                            {/*index路由渲染在父路由的outlet，而且路由地址和父路由相同*/}
                                            {/*index路由在父路由匹配并且其他子路由不匹配的时候 匹配*/}
                                            {/*index路由是一个父节点默认的子节点*/}
                                            {/*index路由在用户还没有点击导航中的链接时渲染*/}
                                            <Route
                                                index
                                                element={
                                                    <main
                                                        style={{
                                                            padding: '1rem',
                                                        }}
                                                    >
                                                        <p>Select an list</p>
                                                    </main>
                                                }
                                            />
                                            <Route
                                                path="news"
                                                element={<News />}
                                            />
                                            <Route
                                                path="params/:id"
                                                element={<Params />}
                                            />
                                            <Route
                                                path=":id"
                                                element={<Item />}
                                            />
                                        </Route>
                                        {/*404*/}
                                        <Route
                                            path="*"
                                            element={
                                                <main
                                                    style={{
                                                        padding: '1rem',
                                                    }}
                                                >
                                                    <p>
                                                        There&#39;s nothing
                                                        here!
                                                    </p>
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
