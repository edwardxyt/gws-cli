import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// 错误边界
import ErrorBoundary from "./component/errorBoundary";
import App from "./pcRouter/App/index";
import Home from "./pcRouter/Home/index";
import Login from "./pcRouter/Login";
import List from "./pcRouter/List/index";
import News from "./pcRouter/List/News/index";
import Item from "./pcRouter/List/Item/index";

// 热启动
if (module.hot) {
    module.hot.accept();
}

// PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then((registration) => {
            console.log('SW registered: ', registration);
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

interface MainProps {
}

export class Main extends React.Component<MainProps, {}> {
    render() {
        return (
            <>
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
                                                <p>Select an invoice</p>
                                            </main>
                                        }
                                    />
                                    <Route path="news" element={<News/>}/>
                                    <Route path=":id" element={<Item/>}/>
                                </Route>
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
            </>
        );
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('main'),
);
