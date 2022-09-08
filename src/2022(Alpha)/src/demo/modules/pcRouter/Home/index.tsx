import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import avatar from '../../asset/avatar.png';
import Logo from '../../asset/logo.svg';
import styles from './home.module.less';

import { MessageOutlined } from '@ant-design/icons';

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
        console.log('styles', styles);
    }

    state = { user: false };

    render() {
        let { user } = this.state;
        return (
            <>
                <h1 className={styles.hone}>
                    wo de \n
                    <span className={styles.tow}>home</span>
                </h1>
                <UserNameDisplayer />
                <MessageOutlined style={{ fontSize: '16px', color: '#08c' }} />
                <img src={avatar} alt="" />
                <img src={Logo} width={200} alt="logo" />
                {user && <Navigate to="/" replace={true} />}
            </>
        );
    }
}
