import React, {Component, lazy, Suspense} from "react";
import * as ReactDOM from 'react-dom';
import PcRouter from "./pcRouter/index";

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

ReactDOM.render( <PcRouter/>, document.getElementById('main'),);
