import { observer, Provider } from 'mobx-react';
import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 错误边界
import ErrorBoundary from '../../component/errorBoundary/index';
import rootStore from '../../store/index';

const App = lazy(() => import('../app/index'));
const Home = lazy(() => import('../home/index'));
const MA = lazy(() => import('../modulea/index'));
const MB = lazy(() => import('../moduleb/index'));

interface PouterProps {}

@observer
export default class PcRouter extends Component<PouterProps, {}> {
    fallback = () => {
        return <div>lazy Loading...</div>;
    };

    render() {
        return (
            <>
                {/*Suspense 是配合 react.lazy使用的*/}
                <Suspense fallback={this.fallback()}>
                    {/*<Provider store={rootStore()}>*/}
                    {/*分开注入...rootStore 或 全局注入store*/}
                    <Provider {...rootStore()}>
                        <BrowserRouter>
                            <ErrorBoundary>
                                <Routes>
                                    <Route path="/" element={<App />}>
                                        {/*index路由渲染在父路由的outlet，而且路由地址和父路由相同*/}
                                        {/*index路由在父路由匹配并且其他子路由不匹配的时候 匹配*/}
                                        {/*index路由是一个父节点默认的子节点*/}
                                        {/*index路由在用户还没有点击导航中的链接时渲染*/}
                                        <Route index element={<Home />} />
                                        <Route path="demo">
                                            <Route path="a" element={<MA />} />
                                            <Route path="b" element={<MB />} />
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
