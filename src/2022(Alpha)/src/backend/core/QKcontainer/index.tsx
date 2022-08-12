import React, { Component } from 'react';
import { start } from 'qiankun';
import './index.less';

class QKcontainer extends Component {
    componentDidMount() {
        // 启动微服务
        start();
    }

    render() {
        return <div id="container" />;
    }
}

export default QKcontainer;
