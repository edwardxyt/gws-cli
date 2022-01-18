import React, {Component, lazy, Suspense} from "react";
import * as ReactDOM from 'react-dom';
import UAParser from "ua-parser-js";
// import PcRouter from "./pcRouter/index";

let parser = new UAParser();
let device = parser.getResult().device;

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

// 通过US 动态加载入口
if (device.type === "mobile") {
    // App = Mobile;
} else {
    console.log(parser.getResult())
    import('./pcRouter/index') .then(({ default: PcRouter }) => {
        ReactDOM.render( <PcRouter/>, document.getElementById('main'),);
    })
}
