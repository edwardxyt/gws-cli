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
                    <Link to="/">App page</Link>
                </h1>
                <nav
                    style={{
                        borderBottom: 'solid 1px',
                        paddingBottom: '1rem',
                    }}
                >
                    <Link style={r} to="/login">
                        go login
                    </Link>
                    |{' '}
                    <Link style={r} to="/home">
                        go home
                    </Link>
                    <Link style={r} to="/list">
                        go List
                    </Link>
                    <Link style={r} to="/list/news">
                        go List/news
                    </Link>
                    <Link style={r} to="/list/params/3300">
                        go List/Params
                    </Link>
                </nav>
                <Button type="primary">Button</Button>
                <Outlet />
            </>
        );
    }
}
