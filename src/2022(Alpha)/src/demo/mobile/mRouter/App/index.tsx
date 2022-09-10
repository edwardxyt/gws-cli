import styles from './app.module.less';

import Bottom from '@src/demo/mobile/mRouter/App/Bottom';
import { AutoCenter, NavBar } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

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
        return (
            <div className="pj-app">
                <Helmet>
                    <title>我的世界</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                </Helmet>
                <div className="pj-top">
                    <NavBar>xiayuting.cc</NavBar>
                </div>
                <Outlet />
                <div className={styles.pjBody}>
                    <AutoCenter>
                        © xiayutng.cc 版权所有 ICP证：
                        <a
                            href="https://beian.miit.gov.cn/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            辽ICP备17020190号-1
                        </a>
                    </AutoCenter>
                </div>
                <div className={styles.pjBottom}>
                    <Bottom />
                </div>
            </div>
        );
    }
}
