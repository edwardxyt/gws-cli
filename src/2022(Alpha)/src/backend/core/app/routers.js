import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';

const routers = [
    {
        name: 'home',
        title: '首页',
        patch: '/',
        icon: <HomeOutlined />,
    },
    {
        name: 'demo',
        title: '案例组件',
        patch: null,
        subMenu: [
            {
                name: 'a',
                title: '案例A',
                patch: 'demo/a',
            },
            {
                name: 'b',
                title: '案例B',
                patch: 'demo/b',
            },
        ],
        icon: <UserOutlined />,
    },
    {
        name: 'basics',
        title: '基础组件',
        patch: null,
        subMenu: [
            {
                name: 'buttton',
                title: '按钮',
                patch: 'basics/button',
            },
            {
                name: 'form',
                title: '表单',
                patch: 'basics/form',
            },
        ],
        icon: <UserOutlined />,
    },
];
export default routers;
