import * as React from 'react';
import avatar from '../../asset/avatar.png';

export default class Home extends React.Component {
    render() {
        return (
            <>
                <h1>home</h1>
                <img src={avatar} alt="" />
            </>
        );
    }
}