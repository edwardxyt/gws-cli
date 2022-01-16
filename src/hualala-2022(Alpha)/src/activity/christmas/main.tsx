import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.less';

import avatar from './asset/avatar.png';

// 热启动
if (module.hot) {
    module.hot.accept();
}

const a = 10;
let b = 23;
let c;
b = 33;
if (b) { b++; }
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

interface HelloProps {
    compiler: string;
    framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <>
                <h1>
                Hello from{this.props.compiler}
                    {' '}
                and{this.props.framework}
                !
                </h1>
                <img src={avatar} alt="" />
            </>
        );
    }
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById('main'),
);
