import { TabBar } from 'antd-mobile';
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Bottom: React.FC<any> = () => {
    let location = useLocation();
    let navigate = useNavigate();
    // const history = useHistory();
    // const location = useLocation();
    // const { pathname } = location;

    const setRouteActive = (value: string) => {
        console.log(value, location);
        navigate(value, { replace: true, state: { name: 'zwc666' } });
        // history.push(value);
    };

    const tabs = [
        {
            key: '/',
            title: '首页',
            icon: <AppOutline />,
        },
        {
            key: '/todo',
            title: '待办',
            icon: <UnorderedListOutline />,
        },
        {
            key: '/message',
            title: '消息',
            icon: <MessageOutline />,
        },
        {
            key: '/me',
            title: '我的',
            icon: <UserOutline />,
        },
    ];

    return (
        <TabBar onChange={value => setRouteActive(value)}>
            {tabs.map(item => (
                <TabBar.Item
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                />
            ))}
        </TabBar>
    );
};

export default Bottom;
