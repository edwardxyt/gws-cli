import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

@inject((rootStore: any) => ({
    user: rootStore.store.user,
}))
@observer
export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }

    render() {
        let r = {
            marginRight: '10px',
        };
        return (
            <>
                <h1>
                    <Link to="/">App demo/modules</Link>
                </h1>
                <nav
                    style={{
                        borderBottom: 'solid 1px',
                        paddingBottom: '1rem',
                    }}
                >
                    |{' '}
                    <Link style={r} to="/home">
                        go home
                    </Link>
                </nav>
                <Button type="primary">Button</Button>
                <Outlet />
            </>
        );
    }
}
