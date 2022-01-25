import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import avatar from '../../asset/avatar.png';

//TODO 无状态 mobx组件
const NameDisplayer = ({ user }: any) => {
    let navigate = useNavigate();

    function handleSubmit(event: any) {
        event.preventDefault();
        navigate('/');
    }

    return <h1 onClick={handleSubmit}>{user.userName}</h1>;
};
const UserNameDisplayer = inject((rootStore: any) => ({
    user: rootStore.store.user,
}))(NameDisplayer);

// 类组件
@inject((rootStore: any) => ({
    user: rootStore.store.user,
}))
@observer
export default class Home extends React.Component {
    constructor(props: any) {
        super(props);
        console.log(this.props);
    }

    state = { user: false };

    render() {
        let { user } = this.state;
        return (
            <>
                <h1>home</h1>
                <UserNameDisplayer />
                <img src={avatar} alt="" />
                {user && <Navigate to="/" replace={true} />}
            </>
        );
    }
}
