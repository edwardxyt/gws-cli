import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import './index.less';

import routers from './routers.js';

const App: React.FC<any> = ({ app }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const menuItemRander = () => {
        return routers.map(item => {
            if (item.subMenu) {
                return (
                    <SubMenu
                        key={item.name}
                        icon={item.icon}
                        title={item.title}
                    >
                        {item.subMenu.map(menu => {
                            return (
                                <Menu.Item key={menu.name}>
                                    <Link to={menu.patch}> {menu.title} </Link>
                                </Menu.Item>
                            );
                        })}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item key={item.name} icon={item.icon}>
                    <Link to={item.patch}> {item.title} </Link>
                </Menu.Item>
            );
        });
    };
    const getBreadcrumb = () => {
        return app.breadcrumb.map((item, index) => {
            if (item === '/') {
                return (
                    <Breadcrumb.Item key={index}>
                        <HomeOutlined />
                    </Breadcrumb.Item>
                );
            }
            return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
        });
    };

    useEffect(() => {
        console.log(11);
    }, []);

    return (
        <Layout
            className="components-layout-demo-responsive"
            style={{ minHeight: '100vh' }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                    <h2>gws-lerna</h2>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    {routers.length > 0 && menuItemRander()}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {app.breadcrumb.length > 0 && getBreadcrumb()}
                    </Breadcrumb>
                    <Outlet></Outlet>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    BI 组件库 @2022.3 Created by BI
                </Footer>
            </Layout>
        </Layout>
    );
};

export default inject('app', 'user')(observer(App));
