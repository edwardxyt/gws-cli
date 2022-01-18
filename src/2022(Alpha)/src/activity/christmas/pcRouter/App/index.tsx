import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import { inject, observer } from 'mobx-react'

@inject(mobxStore => ({
    user: mobxStore.store.user
}))
@observer
export default class App extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props.user)
    }
    render() {
        let r = {
            marginRight: '10px'
        }
        return (
            <>
                <h1><Link to="/">App page</Link></h1>
                <nav
                    style={{
                        borderBottom: "solid 1px",
                        paddingBottom: "1rem"
                    }}
                >
                    <Link style={r} to="/login">go login</Link>|{" "}
                    <Link style={r} to="/home">go home</Link>
                    <Link style={r} to="/list">go List</Link>
                    <Link to="/list/news">go List/news</Link>
                </nav>
                <Outlet />
            </>
        );
    }
}