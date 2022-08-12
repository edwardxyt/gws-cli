import { LikeOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC<any> = ({ app, user }) => {
    useEffect(() => {
        console.log(app, app.newMenuVisible, toJS(app), user);
        app.updateBreadcrumb('breadcrumb', ['/', '欢迎页']);
    }, []);
    return (
        <div className="site-card-wrapper">
            <Row style={{ marginBottom: '16px' }} gutter={[16, 24]}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="统计组件"
                            value={1128}
                            prefix={<LikeOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="稳定/开发"
                            value={93}
                            suffix="/ 100"
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 24]}>
                <Col span={8}>
                    <Card title="@edwardxyt/modulea" bordered={false}>
                        <Link to="demo/a"> 多容器组件案例-A </Link>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="@edwardxyt/moduleb" bordered={false}>
                        <Link to="demo/b"> 基础组件计数器 </Link>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="@edwardxyt/modulec" bordered={false}>
                        表格组件案例
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="qiankun" bordered={false}>
                        <Link to="pj1"> pj1 </Link>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default inject('app', 'user')(observer(Home));
