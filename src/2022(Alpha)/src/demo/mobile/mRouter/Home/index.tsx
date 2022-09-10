import { inject, observer } from 'mobx-react';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import MD from '../../asset/joy.md';

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
        return (
            <>
                <ReactMarkdown rehypePlugins={[remarkGfm, rehypeHighlight]}>
                    {`${MD}`}
                </ReactMarkdown>
            </>
        );
    }
}
