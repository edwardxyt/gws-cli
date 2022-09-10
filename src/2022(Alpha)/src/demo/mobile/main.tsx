/* eslint-disable */
import './public-path';
import React from 'react';
import * as ReactDOM from 'react-dom';
import UAParser from 'ua-parser-js';

let parser = new UAParser();
let device = parser.getResult().device;

declare global {
    interface Window { __POWERED_BY_QIANKUN__: any; }
}

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

let deviceType = '';

// 通过US 动态加载入口
if (device.type === 'mobile') {
    console.log('[UA]', parser.getResult());
    console.log('[DefineMobile]', __API__, __CDN__, __ENV__, __DEBUG__, __PROJECT__, __NODE_ENV__);
    deviceType = 'mRouter';
    // App = Mobile;
} else {
    console.log('[UA]', parser.getResult());
    console.log('[DefinePC]', __API__, __CDN__, __ENV__, __DEBUG__, __PROJECT__, __NODE_ENV__);
    deviceType = 'pcRouter';
    // import('./pcRouter/index').then(({ default: PcRouter }) => {
    //     ReactDOM.render(<PcRouter />, document.getElementById('main'));
    // });
}

function render(props) {
    const { container } = props;
    if (container) {
        import(`./${deviceType}/index`).then(({ default: PcRouter }) => {
            ReactDOM.render(<PcRouter />, container.querySelector('#main'));
        });
    } else {
        import(`./${deviceType}/index`).then(({ default: PcRouter }) => {
            ReactDOM.render(<PcRouter />, document.getElementById('main'));
        });
    }
}

if (!window.__POWERED_BY_QIANKUN__) {
    console.log('no qiankun')
    render({});
}

export async function bootstrap() {
    console.log('[react16] react app bootstraped');
}

export async function mount(props) {
    console.log('[react16] props from main framework', props);
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#main') : document.querySelector('#main'));
}