import * as _ from 'lodash';
import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.less'

import avatar from './asset/avatar.png'

// 热启动
if (module.hot) {
    module.hot.accept()
}

var a =10

// PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
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
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <img src={ avatar } alt="" />
            </>
        )
    }
}

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("main")
);


// interface Person { 
//     firstName: string;
//     lastName: string;
// }

// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// let user = { firstName: "Jane", lastName: "User" };

// document.body.innerHTML = greeter(user);
