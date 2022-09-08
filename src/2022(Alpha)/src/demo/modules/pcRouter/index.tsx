import './index.less';

import { observer, Provider } from 'mobx-react';
import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// 错误边界
import ErrorBoundary from '../component/errorBoundary/index';
import rootStore from '../store/index';

const App = lazy(() => import('./App/index'));
const Home = lazy(() => import('./Home/index'));

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
                                        <Route index element={<Home />} />
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
