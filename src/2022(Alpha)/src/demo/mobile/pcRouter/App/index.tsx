import { Button, Card, Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { Link, Outlet } from 'react-router-dom';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import MD from '../../asset/joy.md';
import styles from './app.module.less';

@inject((rootStore: any) => ({
    user: rootStore.store.user,
}))
@observer
export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log(this.props);
        console.log(styles);
    }

    render() {
        let r = {
            marginRight: '10px',
        };
        return (
            <>
                <Helmet>
                    <title>我的世界</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                </Helmet>
                <Header>
                    <Link style={r} to="/">
                        首页
                    </Link>
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
                </Header>

                <Content>
                    <Outlet />

                    <Card
                        title="我的简历"
                        bordered={false}
                        style={{ width: '90%', margin: '30px auto' }}
                    >
                        <ReactMarkdown
                            rehypePlugins={[remarkGfm, rehypeHighlight]}
                        >
                            {`${MD}`}
                        </ReactMarkdown>
                        <Button type="primary">Button</Button>
                    </Card>

                    {/*<Card*/}
                    {/*    title="求职简历"*/}
                    {/*    bordered={false}*/}
                    {/*    style={{ width: '90%', margin: '30px auto' }}*/}
                    {/*>*/}
                    {/*    <ReactMarkdown*/}
                    {/*        rehypePlugins={[remarkGfm, rehypeHighlight]}*/}
                    {/*        // eslint-disable-next-line*/}
                    {/*        children={`${MD}`}*/}
                    {/*    />*/}
                    {/*</Card>*/}
                </Content>

                <Footer>
                    <p className={styles.footer}>
                        © xiayutng.cc 版权所有 ICP证：
                        <a
                            href="https://beian.miit.gov.cn/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            辽ICP备17020190号-1
                        </a>
                    </p>
                </Footer>
            </>
        );
    }
}
