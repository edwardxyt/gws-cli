import React from 'react';
import * as ReactDOM from 'react-dom';
import UAParser from 'ua-parser-js';

let parser = new UAParser();
let device = parser.getResult().device;

// 如果采用了 模块热替换（HMR）方案 解开注释
// 如果使用 React Fast Refresh 注释下面
// if (module.hot) {
//     module.hot.accept();
// }

// PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// 通过US 动态加载入口
if (device.type === 'mobile') {
    // App = Mobile;
} else {
    console.log('[UA]', parser.getResult());
    console.log('[DefinePC]', __API__, __CDN__, __ENV__, __DEBUG__, __PROJECT__, __NODE_ENV__);
    import('./pcRouter/index').then(({ default: PcRouter }) => {
        ReactDOM.render(<PcRouter />, document.getElementById('main'));
    });
}
