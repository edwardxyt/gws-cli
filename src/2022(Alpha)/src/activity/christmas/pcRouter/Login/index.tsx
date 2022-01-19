import * as React from 'react';

interface LoginProps {
    compiler: string;
    framework: string;
}

export default class Login extends React.Component<LoginProps, {}> {
    render() {
        return (
            <>
                <h1>login</h1>
                <h1>
                    Hello from{this.props.compiler}
                    {' '}
                    and{this.props.framework}
                    !
                </h1>
            </>
        );
    }
}

function greeter(person: string) {
    return "Hello, " + person;
}

let user = "aaa";

greeter(user);