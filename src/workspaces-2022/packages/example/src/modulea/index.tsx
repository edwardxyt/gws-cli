import {
    Button,
    Card,
    Descriptions,
    Divider,
    Drawer,
    Space,
    Table,
    Tag,
} from 'antd';
import { inject, observer } from 'mobx-react';
import MA from 'packages/modulea/index';
import MD from 'packages/modulea/README.md';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';

const dataSource = [
    {
        key: '1',
        param: 'childrenColumnName',
        description: '指定树形结构的列名',
        type: ['string'],
        default: 'children',
        version: '4.16.0',
    },
    {
        key: '2',
        param: 'fixed',
        description: '控制展开图标是否固定，可选 true left right',
        type: ['boolean', 'string'],
        default: 'false',
        version: '',
    },
];

const columns = [
    {
        title: '参数',
        dataIndex: 'param',
        key: 'param',
    },
    {
        title: '说明',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: tags => (
            <>
                {tags.map(tag => {
                    return (
                        <Tag color="green" key={tag}>
                            {tag}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: '默认值',
        dataIndex: 'default',
        key: 'default',
    },
    {
        title: '版本',
        dataIndex: 'version',
        key: 'version',
    },
];

const Component = () => {
    const codeString = `
import React from 'react';
import MA from '@edwardxyt/modulea';

<MA name="xia"></MA>
    `;
    return (
        <SyntaxHighlighter language="jsx" style={docco}>
            {codeString}
        </SyntaxHighlighter>
    );
};

const Modulea: React.FC<any> = ({ app }) => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    useEffect(() => {
        app.updateBreadcrumb('breadcrumb', ['/', '案例组件', '案例A']);
    }, []);
    return (
        <Space direction="vertical">
            <Card bordered={false}>
                <Descriptions
                    title="案例组件A"
                    extra={
                        <Button type="primary" onClick={showDrawer}>
                            ReadMe
                        </Button>
                    }
                >
                    <Descriptions.Item label="npm名称">
                        @edwardxyt/modulea
                    </Descriptions.Item>
                    <Descriptions.Item label="安装方式">
                        npm i -S @edwardxyt/modulea
                    </Descriptions.Item>
                    <Descriptions.Item label="版本">v0.2.34</Descriptions.Item>
                    <Descriptions.Item label="备注">empty</Descriptions.Item>
                    <Descriptions.Item label="作者">夏宇霆</Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="组件预览" bordered={false}>
                <MA></MA>
                <Divider plain>Code</Divider>
                <Component></Component>
            </Card>

            <Card title="API" bordered={false}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </Card>

            <Drawer
                title="README.md"
                placement="right"
                getContainer={false}
                closable={false}
                onClose={onClose}
                visible={visible}
                key="right"
                size="large"
            >
                <ReactMarkdown
                    // eslint-disable-next-line
                    children={`${MD}`}
                    components={{
                        // eslint-disable-next-line
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                                className || ''
                            );
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    // eslint-disable-next-line
                                    children={String(children).replace(
                                        /\n$/,
                                        ''
                                    )}
                                    style={docco}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                    remarkPlugins={[remarkGfm]}
                />
            </Drawer>
        </Space>
    );
};

export default inject('app')(observer(Modulea));
